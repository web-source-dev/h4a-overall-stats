import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Paper, Typography, Tabs, Tab, AppBar } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, AreaChart, Area, BarChart, Bar } from "recharts";
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

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analytics-tabpanel-${index}`}
      aria-labelledby={`analytics-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const TabsHome = () => {
  const [tabValue, setTabValue] = useState(0);
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
            Analytics that Tell Your Story
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
            Discover insights across all your platforms with beautiful, interactive visualizations
          </Typography>
        </Box>
          <AppBar position="static" color="transparent" elevation={0}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              centered
              textColor="primary"
              indicatorColor="primary"
              sx={{
                '& .MuiTab-root': {
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    color: 'primary.main'
                  }
                }
              }}
            >
              <Tab label="Overview" />
              <Tab label="Facebook Analytics" />
              <Tab label="Instagram Insights" />
              <Tab label="Blog Performance" />
            </Tabs>
          </AppBar>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={12}>
                <Paper elevation={3} sx={{ 
                  p: 3, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: 400,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, color: '#ed6c02' }}>
                    Website Traffic Overview
                  </Typography>
                  <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 1 }}>
                    Total Page Views: {traffic.reduce((sum, item) => sum + item.pageViews, 0).toLocaleString()}
                  </Typography>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={traffic} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="pageViews" fill="#ff9800" />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={4}>
              {['Interactions', 'Reach', 'Views', 'Visits'].map((metric, index) => (
                <Grid item xs={12} md={6} key={metric}>
                  <Paper elevation={2} sx={{ 
                    p: 3,
                    height: '90%',
                    backgroundColor: `rgba(${index === 0 ? '25, 118, 210' : index === 1 ? '46, 125, 50' : index === 2 ? '255, 152, 0' : '255, 87, 34'}, 0.08)`,
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'translateY(-4px)' }
                  }}>
                    <Typography variant="h6" align="center" sx={{ 
                      color: index === 0 ? '#1976d2' : index === 1 ? '#2e7d32' : index === 2 ? '#f57c00' : '#ff5722',
                      mb: 2,
                      fontWeight: 600
                    }}>
                      {metric}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ 
                      textAlign: 'center', 
                      mb: 3,
                      fontWeight: 500,
                      color: 'text.secondary'
                    }}>
                      Total: {fbMetrics[metric.toLowerCase()].reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                    </Typography>
                    <ResponsiveContainer width="100%" height={250}>
                      {index === 0 ? (
                        <LineChart data={fbMetrics[metric.toLowerCase()]} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                          <Line type="monotone" dataKey="value" stroke="#1976d2" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 6 }} />
                        </LineChart>
                      ) : index === 1 ? (
                        <AreaChart data={fbMetrics[metric.toLowerCase()]} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                          <Area type="monotone" dataKey="value" stroke="#2e7d32" fill="#2e7d32" fillOpacity={0.2} />
                        </AreaChart>
                      ) : index === 2 ? (
                        <BarChart data={fbMetrics[metric.toLowerCase()]} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                          <Bar dataKey="value" fill="#f57c00" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      ) : (
                        <ComposedChart data={fbMetrics[metric.toLowerCase()]} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                          <Bar dataKey="value" fill="#ff5722" fillOpacity={0.4} radius={[4, 4, 0, 0]} />
                          <Line type="monotone" dataKey="value" stroke="#ff5722" strokeWidth={2} dot={true} />
                        </ComposedChart>
                      )}
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 3, bgcolor: 'rgba(225, 48, 108, 0.05)', height: '100%' }}>
                  <Typography variant="h6" align="center" sx={{ color: '#e1306c', mb: 2 }}>Views</Typography>
                  <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 2, fontWeight: 500 }}>
                    Total: {igMetrics.views.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                  </Typography>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={igMetrics.views} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#E1306C" />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 3, bgcolor: 'rgba(193, 53, 132, 0.05)', height: '100%' }}>
                  <Typography variant="h6" align="center" sx={{ color: '#c13584', mb: 2 }}>Reach</Typography>
                  <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 2, fontWeight: 500 }}>
                    Total: {igMetrics.reach.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                  </Typography>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={igMetrics.reach} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#C13584" fill="#C13584" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ 
                  p: 3,
                  height: '90%',
                  backgroundColor: 'rgba(103, 58, 183, 0.08)',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}>
                  <Typography variant="h6" align="center" sx={{ color: '#673ab7', mb: 2 }}>Blog Views</Typography>
                  <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 2, fontWeight: 500 }}>
                    Total Views: {blogStats.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={blogStats} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ 
                  p: 3,
                  height: '90%',
                  backgroundColor: 'rgba(46, 125, 50, 0.08)',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}>
                  <Typography variant="h6" align="center" sx={{ color: '#2e7d32', mb: 2 }}>Unique Visitors</Typography>

                  <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 2, fontWeight: 500 }}>
                    Total Unique Visitors: {blogStats.reduce((sum, item) => sum + item.visitors, 0).toLocaleString()}
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={blogStats} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="visitors" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
        </Container>
      </Box>
  );
};
export default TabsHome;