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



const NewHome = () => {
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
                <Typography variant="h2" sx={{ mt: 5, mb: 5, textAlign: "center", fontWeight: 'bold' }}>
                    HARMONY 4 ALL
                </Typography>
                <Typography variant="h4" sx={{ mb: 4 }}>Website Analytics</Typography>
                <Grid container spacing={6}>
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
                            <Typography
                                variant="h4"
                                sx={{
                                    textAlign: 'center',
                                    p: 2,
                                    backgroundColor: '#f5f5f5',
                                    display: 'inline-block',
                                    borderRadius: '8px'
                                }}
                            >
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

                <Typography variant="h4" sx={{ mb: 4, mt: 8 }}>Facebook Analytics</Typography>
                <Grid container spacing={6}>
                    {['Interactions', 'Reach', 'Views', 'Visits'].map((metric, index) => (
                        <Grid item xs={12} md={6} key={metric}>
                            <Paper elevation={2} sx={{
                                p: 3,
                                height: '90%',
                                backgroundColor: `rgba(${index === 0 ? '25, 118, 210' : index === 1 ? '46, 125, 50' : index === 2 ? '255, 152, 0' : '255, 87, 34'}, 0.08)`,
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'translateY(-4px)' }
                            }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        textAlign: 'center',
                                        p: 2,
                                        backgroundColor: '#f5f5f5a3',
                                        display: 'block',
                                        borderRadius: '8px'
                                    }}
                                >
                                    {metric} : {fbMetrics[metric.toLowerCase()].reduce((sum, item) => sum + item.value, 0).toLocaleString()}
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

                <Typography variant="h4" sx={{ mb: 4, mt: 8 }}>Instagram Insights</Typography>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={2} sx={{ p: 3, bgcolor: 'rgba(225, 48, 108, 0.05)', height: '100%' }}>
                        <Typography
                                    variant="h4"
                                    sx={{
                                        textAlign: 'center',
                                        p: 2,
                                        backgroundColor: '#f5f5f5a3',
                                        display: 'block',
                                        borderRadius: '8px'
                                    }}
                                >
                                Views : {igMetrics.views.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
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
                        <Typography
                                    variant="h4"
                                    sx={{
                                        textAlign: 'center',
                                        p: 2,
                                        backgroundColor: '#f5f5f5a3',
                                        display: 'block',
                                        borderRadius: '8px'
                                    }}
                                >
                                Reach : {igMetrics.reach.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
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

                <Typography variant="h4" sx={{ mb: 4, mt: 12 }}>Blog Performance</Typography>
                <Grid container spacing={6} mb={5}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={2} sx={{
                            p: 3,
                            height: '90%',
                            backgroundColor: 'rgba(103, 58, 183, 0.08)',
                            transition: 'transform 0.3s ease',
                            '&:hover': { transform: 'translateY(-4px)' }
                        }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        textAlign: 'center',
                                        p: 2,
                                        backgroundColor: '#f5f5f5a3',
                                        display: 'block',
                                        borderRadius: '8px'
                                    }}
                                >
                               Blog Views: {blogStats.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
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
                        }}>     <Typography
                        variant="h4"
                        sx={{
                            textAlign: 'center',
                            p: 2,
                            backgroundColor: '#f5f5f5a3',
                            display: 'block',
                            borderRadius: '8px'
                        }}
                    >
                    Blog Visitors : {blogStats.reduce((sum, item) => sum + item.visitors, 0).toLocaleString()}
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

            </Container>
        </Box>
    );
};
export default NewHome