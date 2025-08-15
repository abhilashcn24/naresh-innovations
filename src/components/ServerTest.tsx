import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, XCircle, Server } from 'lucide-react';

interface ServerResponse {
  status?: string;
  message?: string;
  data?: any;
  error?: string;
}

const ServerTest: React.FC = () => {
  const [healthStatus, setHealthStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [healthData, setHealthData] = useState<ServerResponse | null>(null);
  const [helloData, setHelloData] = useState<ServerResponse | null>(null);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitResponse, setSubmitResponse] = useState<ServerResponse | null>(null);

  const API_BASE_URL = 'http://localhost:3001/api';

  // Test server health on component mount
  useEffect(() => {
    testHealth();
  }, []);

  const testHealth = async () => {
    setHealthStatus('loading');
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      setHealthData(data);
      setHealthStatus('success');
    } catch (error) {
      console.error('Health check failed:', error);
      setHealthStatus('error');
    }
  };

  const testHello = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/hello`);
      const data = await response.json();
      setHelloData(data);
    } catch (error) {
      console.error('Hello endpoint failed:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    
    try {
      const response = await fetch(`${API_BASE_URL}/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      setSubmitResponse(data);
      setSubmitStatus('success');
      
      if (response.ok) {
        setFormData({ name: '', message: '' });
      }
    } catch (error) {
      console.error('Submit failed:', error);
      setSubmitStatus('error');
    }
  };

  const getStatusIcon = (status: 'loading' | 'success' | 'error') => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Server Connection Test
          </CardTitle>
          <CardDescription>
            Test your connection to the custom backend server running on localhost:3001
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Health Check */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Server Health</h3>
              <p className="text-sm text-muted-foreground">
                Check if the server is running and responding
              </p>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(healthStatus)}
              <Button variant="outline" size="sm" onClick={testHealth}>
                Test Health
              </Button>
            </div>
          </div>

          {healthData && (
            <div className="p-4 bg-muted rounded-lg">
              <pre className="text-sm overflow-auto">
                {JSON.stringify(healthData, null, 2)}
              </pre>
            </div>
          )}

          {/* Hello Endpoint */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Hello Endpoint</h3>
              <p className="text-sm text-muted-foreground">
                Test the hello API endpoint
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={testHello}>
              Test Hello
            </Button>
          </div>

          {helloData && (
            <div className="p-4 bg-muted rounded-lg">
              <pre className="text-sm overflow-auto">
                {JSON.stringify(helloData, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form Test */}
      <Card>
        <CardHeader>
          <CardTitle>Submit Data Test</CardTitle>
          <CardDescription>
            Test the POST endpoint by submitting form data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Enter your message"
                required
              />
            </div>

            <Button type="submit" disabled={submitStatus === 'loading'}>
              {submitStatus === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Data
            </Button>
          </form>

          {submitResponse && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={submitResponse.error ? 'destructive' : 'default'}>
                  {submitResponse.error ? 'Error' : 'Success'}
                </Badge>
              </div>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(submitResponse, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle>Connection Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Frontend URL:</span>
              <code className="bg-muted px-2 py-1 rounded">http://localhost:8080</code>
            </div>
            <div className="flex justify-between">
              <span>Backend URL:</span>
              <code className="bg-muted px-2 py-1 rounded">http://localhost:3001</code>
            </div>
            <div className="flex justify-between">
              <span>API Base URL:</span>
              <code className="bg-muted px-2 py-1 rounded">{API_BASE_URL}</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServerTest;
