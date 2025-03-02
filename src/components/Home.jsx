import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Paper, Typography, Tabs, Tab, AppBar } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, LabelList, ResponsiveContainer, ComposedChart, AreaChart, Area, BarChart, Bar } from "recharts";
import reachData from "./GraphsJson/json_Reach (1).json";
import reportData from "./GraphsJson/json_report-name_2025-01-01_2025-01-31.json";
import interactionsData from "./GraphsJson/json_Interactions.json";
import visitsData from "./GraphsJson/json_Visits.json";
import trafficData from "./GraphsJson/json_Traffic report_2025-01-31-2025-03-02.json";
import blogData from "./GraphsJson/json_blog_table_api_2025-01-01-2025-02-01 (1).json";
import fbInteractionsData from "./GraphsJson/facebook/final_json_Interactions (1).json";
import fbReachData from "./GraphsJson/facebook/final_json_Reach (2).json";
import fbViewsData from "./GraphsJson/facebook/final_json_Views (2).json";
import fbVisitsData from "./GraphsJson/facebook/final_json_Visits (1).json";
import igViewsData from "./GraphsJson/instagram/final_json_Views (3).json";
import './Home.css'



const Home = () => {
  const [reach, setReach] = useState([]);
  const [views, setViews] = useState([]);
  const [interactions, setInteractions] = useState([]);
  const [visits, setVisits] = useState([]);
  const [traffic, setTraffic] = useState([]);
  const [blogStats, setBlogStats] = useState([]);
  const [fbMetrics, setFbMetrics] = useState({
    interactions: [],
    reach: [],
    views: [],
    visits: []
  });

  const [igMetrics, setIgMetrics] = useState({
    views: [],
    reach: []
  });



  useEffect(() => {
    // Process Facebook metrics
    const processedFbInteractions = fbInteractionsData.map(item => ({
      date: new Date(item.Date).toLocaleDateString(),
      value: item.Value
    }));

    const processedFbReach = fbReachData.map(item => ({
      date: new Date(item.Date).toLocaleDateString(),
      value: item.Value
    }));

    const processedFbViews = fbViewsData.map(item => ({
      date: new Date(item.Date).toLocaleDateString(),
      value: item.Value
    }));

    const processedFbVisits = fbVisitsData.map(item => ({
      date: new Date(item.Date).toLocaleDateString(),
      value: item.Value
    }));

    setFbMetrics({
      interactions: processedFbInteractions,
      reach: processedFbReach,
      views: processedFbViews,
      visits: processedFbVisits
    });
    // Process reach data
    const processedReach = reachData.slice(1).map(item => ({
      date: new Date(item["#Instagram reach"]).toLocaleDateString(),
      reach: parseInt(item["Unnamed: 1"])
    }));
    setReach(processedReach);

    // Process views data
    const processedViews = reportData.slice(1).map(item => ({
      date: new Date(item["Time period"]).toLocaleDateString(),
      views: parseInt(item["Current period"])
    }));
    setViews(processedViews);

    // Process interactions data
    const processedInteractions = interactionsData.slice(1).map(item => ({
      date: new Date(item["#Content interactions"]).toLocaleDateString(),
      interactions: parseInt(item["Unnamed: 1"])
    }));
    setInteractions(processedInteractions);

    // Process visits data
    const processedVisits = visitsData.slice(1).map(item => ({
      date: new Date(item["#Facebook visits"]).toLocaleDateString(),
      visits: parseInt(item["Unnamed: 1"])
    }));
    setVisits(processedVisits);

    // Process traffic data
    const processedTraffic = trafficData.map(item => ({
      date: item["Date"],
      pageViews: item["Page views"]
    }));
    setTraffic(processedTraffic);

    // Process blog data
    const processedBlogStats = blogData.filter(item => item["Action date"]).map(item => ({
      date: item["Action date"],
      views: item["Post views"],
      visitors: item["Unique visitors"],
      engagement: item["Comments"] + item["Likes"] + item["Shares"]
    }));
    setBlogStats(processedBlogStats);

    // Process Instagram metrics
    const processedIgViews = igViewsData.map(item => ({
      date: new Date(item.Date).toLocaleDateString(),
      value: item.Value
    }));

    const processedIgReach = reachData.slice(1).map(item => ({
      date: new Date(item["#Instagram reach"]).toLocaleDateString(),
      value: parseInt(item["Unnamed: 1"])
    }));

    setIgMetrics({
      views: processedIgViews,
      reach: processedIgReach
    });
  }, []);

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(33, 150, 243, 0.1) 0%, rgba(33, 203, 243, 0.05) 50%, transparent 100%)',
          animation: 'pulse 15s infinite',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <Box sx={{
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          mb: 12,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '120%',
            height: '120%',
            background: 'radial-gradient(circle at center, rgba(33, 150, 243, 0.1) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            animation: 'rotate 20s linear infinite',
            zIndex: -1
          }
        }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '4.5rem' },
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
              animation: 'fadeIn 1s ease-in, float 6s ease-in-out infinite',
              textShadow: '0 0 30px rgba(33, 150, 243, 0.3)',
              letterSpacing: '-0.02em',
              transform: 'perspective(1000px)'
            }}
          >
            Analytics that Tell Our Story
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: 'text.secondary',
              mb: 6,
              maxWidth: '800px',
              mx: 'auto',
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              animation: 'slideUp 1s ease-in-out',
              opacity: 0.9,
              lineHeight: 1.6,
              transform: 'perspective(1000px) translateZ(0)'
            }}
          >
            Insights across our all platforms with beautiful, interactive visualizations
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>Overall Platform Performance</Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 600,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, color: '#1976d2' }}>
                Cross-Platform Analytics Overview
              </Typography>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart
                  layout="vertical"
                  data={[
                    {
                      name: 'Website Views',
                      value: traffic.reduce((sum, item) => sum + item.pageViews, 0)
                    },
                    {
                      name: 'Facebook Interactions',
                      value: fbMetrics.interactions.reduce((sum, item) => sum + item.value, 0)
                    },
                    {
                      name: 'Facebook Reach',
                      value: fbMetrics.reach.reduce((sum, item) => sum + item.value, 0)
                    },
                    {
                      name: 'Facebook Views',
                      value: fbMetrics.views.reduce((sum, item) => sum + item.value, 0)
                    },
                    {
                      name: 'Facebook Visits',
                      value: fbMetrics.visits.reduce((sum, item) => sum + item.value, 0)
                    },
                    {
                      name: 'Instagram Views',
                      value: igMetrics.views.reduce((sum, item) => sum + item.value, 0)
                    },
                    {
                      name: 'Instagram Reach',
                      value: igMetrics.reach.reduce((sum, item) => sum + item.value, 0)
                    },
                    {
                      name: 'Blog Views',
                      value: blogStats.reduce((sum, item) => sum + item.views, 0)
                    },
                    {
                      name: 'Blog Visitors',
                      value: blogStats.reduce((sum, item) => sum + item.visitors, 0)
                    }
                  ]}
                  margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`} />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip formatter={(value) => `${(value / 1000).toFixed(1)}K`} />
                  <Bar dataKey="value">
                  <LabelList
  dataKey="value"
  position="right"
  formatter={(value) => `${(value / 1000).toFixed(1)}K`}
  content={(props) => {
    const { x, y, value } = props;
    return (
      <text
        x={x + 1200} // Adjust to keep it on the right
        y={y + 30} 
        dy={4}
        fill="#000" // Dark black color
        fontWeight="bold" // Bold text
        fontSize={18}
        textAnchor="start"
      >
        {(value / 1000).toFixed(1)}K
      </text>
    );
  }}
/>

                    {[
                      { fill: '#FF5733a2' }, // Bright Red-Orange
                      { fill: '#FF33A8a2' }, // Neon Pink
                      { fill: '#33FF57a2' }, // Vivid Green
                      { fill: '#33A8FFa2' }, // Electric Blue
                      { fill: '#FFD700a2' }, // Gold
                      { fill: '#FF4500a2' }, // Orange-Red
                      { fill: '#8A2BE2a2' }, // Blue Violet
                      { fill: '#00FFFFa2' }, // Cyan
                      { fill: '#FF1493a2' }  // Deep Pink
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}

                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
};
export default Home