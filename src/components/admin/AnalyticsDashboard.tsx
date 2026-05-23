import { BarChart3, Users, Building2, TrendingUp, ArrowUpRight, ArrowDownRight, Package, CreditCard, Clock, CheckCircle2, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PHARMACIES, PHARMACY_LEADS, INVENTORY_ITEMS } from "@/data/mockData";
import { motion } from "framer-motion";

export function AnalyticsDashboard() {
  const totalRevenue = PHARMACIES.reduce((acc, p) => acc + (p.revenue || 0), 0);
  const pendingApprovals = PHARMACIES.filter(p => p.approvalStatus === 'Pending').length;
  
  const stats = [
    {
      title: "Total Revenue",
      value: `KES ${totalRevenue.toLocaleString()}`,
      change: "+15.2%",
      trend: "up",
      icon: CreditCard,
      color: "text-cyan-600",
      bg: "bg-cyan-50"
    },
    {
      title: "Total Pharmacies",
      value: PHARMACIES.length,
      change: "+2 this month",
      trend: "up",
      icon: Building2,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Pending Approvals",
      value: pendingApprovals,
      change: "Immediate action",
      trend: "down",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      title: "Total Leads",
      value: PHARMACY_LEADS.length,
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">System Overview</h2>
          <p className="text-muted-foreground">Aggregated platform analytics for Super Admin.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border p-1 rounded-lg">
          <button className="px-3 py-1.5 text-xs font-medium bg-slate-100 rounded-md">Last 30 Days</button>
          <button className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-50 rounded-md">Yearly</button>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="border-none shadow-sm shadow-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">{stat.title}</CardTitle>
                <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center mt-1">
                  {stat.trend === "up" && <ArrowUpRight className="h-4 w-4 text-emerald-500 mr-1" />}
                  {stat.trend === "down" && <ArrowDownRight className="h-4 w-4 text-rose-500 mr-1" />}
                  <p className="text-xs text-muted-foreground">
                    <span className={stat.trend === "up" ? "text-emerald-600 font-medium" : stat.trend === "down" ? "text-rose-600 font-medium" : ""}>
                      {stat.change}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-none shadow-sm shadow-slate-200">
          <CardHeader>
            <CardTitle>Platform Growth</CardTitle>
            <CardDescription>Pharmacies joining the platform over the last year.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-end justify-between gap-2 px-6 pb-8">
            {/* Mock Chart Bars */}
            {[40, 60, 45, 90, 65, 80, 50, 70, 85, 45, 60, 75].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                  className="w-full bg-cyan-500/10 group-hover:bg-cyan-500/40 transition-colors rounded-t-sm relative"
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {Math.round(height / 2)} signups
                  </div>
                </motion.div>
                <span className="text-[10px] text-slate-400">
                  {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-3 border-none shadow-sm shadow-slate-200">
          <CardHeader>
            <CardTitle>Top Subscriptions</CardTitle>
            <CardDescription>Distribution of paid packages.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[ 
                { label: 'Premium', count: 12, color: 'bg-cyan-500', percent: 65 },
                { label: 'Growth', count: 8, color: 'bg-amber-500', percent: 25 },
                { label: 'Basic', count: 5, color: 'bg-emerald-500', percent: 10 }
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-slate-500">{item.count} pharmacies</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percent}%` }}
                      className={`h-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="font-bold">85% Retention</p>
                  <p className="text-xs text-slate-500">Pharmacies renewing subscriptions.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="h-10 w-10 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="font-bold">3-Month Grace Period</p>
                  <p className="text-xs text-slate-500">Applied to all new registrations.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}