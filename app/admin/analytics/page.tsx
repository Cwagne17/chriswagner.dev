"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { BarChart3, Eye, Globe, TrendingUp, Users } from "lucide-react";
import AuthWrapper from "../../../components/AuthWrapper";

function AnalyticsPage() {
  // Mock analytics data - in real app this would come from your analytics service
  const analytics = {
    totalViews: 12543,
    uniqueVisitors: 8921,
    bounceRate: 34.2,
    averageSessionDuration: "3:45",
    topPages: [
      { page: "/", views: 3201, percentage: 25.5 },
      {
        page: "/projects/aws-cloud-infrastructure",
        views: 2104,
        percentage: 16.8,
      },
      { page: "/services", views: 1876, percentage: 15.0 },
      { page: "/projects/stig-compliance", views: 1432, percentage: 11.4 },
      { page: "/contact", views: 1298, percentage: 10.4 },
    ],
    monthlyViews: [
      { month: "Jan", views: 8943 },
      { month: "Feb", views: 9821 },
      { month: "Mar", views: 10567 },
      { month: "Apr", views: 11234 },
      { month: "May", views: 12543 },
    ],
    trafficSources: [
      { source: "Organic Search", visits: 5621, percentage: 45.2 },
      { source: "Direct", visits: 3401, percentage: 27.3 },
      { source: "Social Media", visits: 2134, percentage: 17.1 },
      { source: "Referral", visits: 987, percentage: 7.9 },
      { source: "Email", visits: 312, percentage: 2.5 },
    ],
    deviceBreakdown: [
      { device: "Desktop", visits: 7234, percentage: 58.1 },
      { device: "Mobile", visits: 4123, percentage: 33.1 },
      { device: "Tablet", visits: 1098, percentage: 8.8 },
    ],
  };

  return (
    <AdminLayout
      title="Analytics"
      subtitle="Website performance and visitor insights"
    >
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Views
                </p>
                <p className="text-2xl font-bold">
                  {analytics.totalViews.toLocaleString()}
                </p>
                <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +15.3% from last month
                </p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Unique Visitors
                </p>
                <p className="text-2xl font-bold">
                  {analytics.uniqueVisitors.toLocaleString()}
                </p>
                <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +12.8% from last month
                </p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Bounce Rate
                </p>
                <p className="text-2xl font-bold">{analytics.bounceRate}%</p>
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 rotate-180" />
                  +2.1% from last month
                </p>
              </div>
              <Globe className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Avg. Session
                </p>
                <p className="text-2xl font-bold">
                  {analytics.averageSessionDuration}
                </p>
                <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +5.7% from last month
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Pages */}
          <div className="bg-card rounded-lg border border-border">
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-lg">Top Pages</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {analytics.topPages.map((page, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <p className="font-medium truncate">{page.page}</p>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${page.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="font-medium">
                        {page.views.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {page.percentage}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-card rounded-lg border border-border">
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-lg">Traffic Sources</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {analytics.trafficSources.map((source, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{source.source}</p>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${source.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="font-medium">
                        {source.visits.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {source.percentage}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Device Breakdown */}
          <div className="bg-card rounded-lg border border-border">
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-lg">Device Breakdown</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {analytics.deviceBreakdown.map((device, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{device.device}</p>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${device.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="font-medium">
                        {device.visits.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {device.percentage}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="bg-card rounded-lg border border-border">
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-lg">Monthly Views</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {analytics.monthlyViews.map((month, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{month.month}</p>
                      <div className="w-full bg-muted rounded-full h-3 mt-2">
                        <div
                          className="bg-orange-500 h-3 rounded-full"
                          style={{
                            width: `${(month.views / Math.max(...analytics.monthlyViews.map((m) => m.views))) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="font-medium">
                        {month.views.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default function AdminAnalyticsPage() {
  return (
    <AuthWrapper requiredGroup="ADMINS">
      <AnalyticsPage />
    </AuthWrapper>
  );
}
