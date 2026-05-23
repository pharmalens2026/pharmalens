import React, { useState } from "react";
import { 
  Send, 
  History, 
  Search, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Users,
  Filter,
  Phone,
  Link2,
  Paperclip
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PHARMACIES, MOCK_SMS_LOGS } from "@/data/mockData";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

export function MessageSystem() {
  const [activeTab, setActiveTab] = useState<"compose" | "history">("compose");
  const [selectedPharmacyId, setSelectedPharmacyId] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = MOCK_SMS_LOGS.filter(log => 
    log.entityName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.phoneNumber.includes(searchTerm)
  );

  const handleSendMessage = async () => {
    if (!selectedPharmacyId || !message) {
      toast.error("Please select a recipient and enter a message");
      return;
    }

    setIsSending(true);
    const pharmacy = PHARMACIES.find(p => p.id === selectedPharmacyId);
    
    try {
      toast.info("Sending SMS via Africa's Talking...");

      const { data, error } = await supabase.functions.invoke('send-sms', {
        body: {
          pharmacyId: selectedPharmacyId,
          phoneNumber: pharmacy?.phone || "+254000000000",
          message: message
        }
      });

      if (error) throw error;

      toast.success("Message sent successfully!");
      setMessage("");
      setSelectedPharmacyId("");
    } catch (error: any) {
      console.error("SMS Error:", error);
      toast.error(error.message || "Failed to send SMS");
    } finally {
      setIsSending(false);
    }
  };

  const insertTemplate = (type: string) => {
    const pharmacy = PHARMACIES.find(p => p.id === selectedPharmacyId);
    const name = pharmacy ? pharmacy.name : "[Pharmacy Name]";
    
    switch (type) {
      case 'payment':
        setMessage(`Hello ${name}, your subscription for PharmaLens is due. Please pay KES 999 using this Paystack link: https://checkout.paystack.com/pay/pharmalens-sub`);
        break;
      case 'welcome':
        setMessage(`Welcome ${name} to PharmaLens! Your account is now active and you can start listing your inventory.`);
        break;
      case 'alert':
        setMessage(`URGENT: ${name}, we've noticed low stock for several critical items in your inventory. Please update your stock levels.`);
        break;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle2 className="text-emerald-500" size={14} />;
      case 'Sent':
        return <Clock className="text-blue-500" size={14} />;
      case 'Failed':
        return <AlertCircle className="text-rose-500" size={14} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Message System</h2>
          <p className="text-slate-500">Communicate with pharmacies via SMS (Africa's Talking).</p>
        </div>
        <div className="flex bg-white border border-slate-200 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("compose")}
            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${
              activeTab === "compose" 
                ? "bg-cyan-600 text-white shadow-sm" 
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <Send size={14} className="inline mr-2" /> Compose
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${
              activeTab === "history" 
                ? "bg-cyan-600 text-white shadow-sm" 
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <History size={14} className="inline mr-2" /> Logs
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {activeTab === "compose" ? (
            <Card className="border-none shadow-sm h-full">
              <CardHeader>
                <CardTitle className="text-lg">New SMS Message</CardTitle>
                <CardDescription>Send an official notification to a registered pharmacy.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Recipient Pharmacy</Label>
                  <Select value={selectedPharmacyId} onValueChange={setSelectedPharmacyId}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Choose a pharmacy..." />
                    </SelectTrigger>
                    <SelectContent>
                      {PHARMACIES.map(p => (
                        <SelectItem key={p.id} value={p.id}>
                          <div className="flex items-center gap-2">
                            <span>{p.name}</span>
                            <span className="text-slate-400 text-xs">({p.phone})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Message Content</Label>
                    <span className={`text-[10px] font-bold ${message.length > 160 ? 'text-rose-500' : 'text-slate-400'}`}>
                      {message.length} / 160 chars ({Math.ceil(message.length / 160)} SMS)
                    </span>
                  </div>
                  <Textarea 
                    placeholder="Type your message here..." 
                    className="min-h-[200px] text-base resize-none focus:ring-cyan-600"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-xs text-slate-400 uppercase font-bold tracking-wider">Quick Templates</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs h-8 border-slate-200 hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-200"
                      onClick={() => insertTemplate('payment')}
                    >
                      <Link2 size={12} className="mr-1" /> Paystack Link
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs h-8 border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                      onClick={() => insertTemplate('welcome')}
                    >
                      <Users size={12} className="mr-1" /> Welcome Note
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs h-8 border-slate-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200"
                      onClick={() => insertTemplate('alert')}
                    >
                      <AlertCircle size={12} className="mr-1" /> Urgent Alert
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <Paperclip size={14} />
                    <span>No attachments available for SMS</span>
                  </div>
                  <Button 
                    className="bg-cyan-600 hover:bg-cyan-700 gap-2 h-11 px-8"
                    onClick={handleSendMessage}
                    disabled={isSending}
                  >
                    {isSending ? "Sending..." : "Send Message"}
                    <Send size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-none shadow-sm">
              <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Message History</CardTitle>
                  <CardDescription>Review all outgoing SMS communications.</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <Input 
                    placeholder="Search logs..." 
                    className="pl-9 h-9 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  <div className="divide-y divide-slate-50">
                    {filteredLogs.map((log) => (
                      <div key={log.id} className="p-4 hover:bg-slate-50/50 transition-colors group">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 rounded-lg">
                              <AvatarFallback className="bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg">
                                {log.entityName.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-bold text-slate-900">{log.entityName}</p>
                              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                                <Phone size={10} />
                                <span>{log.phoneNumber}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1.5 justify-end mb-1 text-xs font-semibold">
                              {getStatusIcon(log.status)}
                              <span className={
                                log.status === 'Delivered' ? 'text-emerald-600' : 
                                log.status === 'Sent' ? 'text-blue-600' : 'text-rose-600'
                              }>{log.status}</span>
                            </div>
                            <span className="text-[10px] text-slate-400">{log.date}</span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 bg-slate-50/80 p-3 rounded-lg border border-slate-100/50 group-hover:bg-white group-hover:border-slate-200 transition-all">
                          {log.message}
                        </p>
                      </div>
                    ))}
                    {filteredLogs.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                        <MessageSquare size={40} className="opacity-20 mb-4" />
                        <p>No message logs found.</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar Analytics */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-bold">SMS Quota</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Monthly Limit</span>
                  <span className="font-bold text-slate-900">1,842 / 5,000</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 w-[37%]" />
                </div>
              </div>
              <Button variant="ghost" className="w-full text-xs h-8 text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50">
                Upgrade Quota
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-bold">Integration Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-xs text-slate-600">Africa's Talking</span>
                <Badge className="bg-emerald-100 text-emerald-700 border-none text-[10px] h-5">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-xs text-slate-600">Paystack API</span>
                <Badge className="bg-emerald-100 text-emerald-700 border-none text-[10px] h-5">Online</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-xs text-slate-600">Supabase Functions</span>
                <Badge className="bg-emerald-100 text-emerald-700 border-none text-[10px] h-5">Operational</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-slate-900 text-white">
            <CardContent className="p-6 space-y-4">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-cyan-400">
                <MessageSquare size={20} />
              </div>
              <div>
                <h4 className="font-bold">Pro-tip: Bulk SMS</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  You can send bulk messages to all active pharmacies via the filters in the Logs tab. Use templates for consistency.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}