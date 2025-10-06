import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Shield, Zap } from 'lucide-react'; 
import { cookies } from 'next/headers';

const AUTH_TOKEN_KEY = "token"; 
const LOGIN_ROUTE = '/login'; 

export default async function DashboardPage() {
    
    const token = (await cookies()).get(AUTH_TOKEN_KEY)?.value;
    if (!token) {
        redirect(LOGIN_ROUTE);
    }

    let adminInfo = null;
    let dashboardData = null; 

    try {
        const verifyResponse = await fetch('http://localhost:5000/api/v1/auth', {
            cache: 'no-store',
            headers: {
                // টোকেনটি Bearer স্কিমায় পাঠানো হচ্ছে
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });

        // ফিক্স ১: API Response-এর ok স্ট্যাটাস চেক করা
        if (!verifyResponse.ok) {
            // যদি সার্ভার 401/403 দেয়, তাহলে রিডাইরেক্ট করে দিন।
            if (verifyResponse.status === 401 || verifyResponse.status === 403) {
                redirect(LOGIN_ROUTE);
            }
            // অন্য error হলে, error পেজ দেখান।
            return <div className='p-8 text-red-600'>API call failed with status: {verifyResponse.status}.</div>;
        }

        const result = await verifyResponse.json();
        // console.log(result); // ডিবাগিংয়ের জন্য

        // ফিক্স ২: ডেটা অ্যারের প্রথম আইটেমটি নেওয়া
        if (result.data && Array.isArray(result.data) && result.data.length > 0) {
            // অ্যারে থেকে প্রথম অবজেক্টটি (Index 0) অ্যাডমিন ডেটা হিসেবে নেওয়া হলো।
            adminInfo = result.data[0]; 
        } else {
            return <div className='p-8 text-yellow-600'>No admin data found in the response array.</div>;
        }

    } catch (error) {
        console.error("Dashboard API error:", error);
        return <div className='p-8 text-red-600'>Failed to connect to the backend API. Please check server status.</div>;
    }
    if (!adminInfo) {
        return <div className='p-8'>Admin data processing failed after successful API call.</div>;
    }

    dashboardData = [
        { title: "Active Users", value: 1, icon: User },
        { title: "Role Level", value: adminInfo.role || 'Super Admin', icon: Shield },
        { title: "Active Projects", value: 12, icon: Zap },
        { title: "Pending Tasks", value: 5, icon: Mail },
    ];


    return (
        <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-extrabold text-gray-900 border-b pb-2">Admin Control Panel</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardData.map((item) => (
                    <Card key={item.title} className="shadow-xl hover:shadow-2xl transition-shadow duration-300 border-l-4 border-blue-600">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">{item.title}</CardTitle>
                            <item.icon className="h-5 w-5 text-gray-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{item.value}</div>
                            {item.title === 'Role Level' && <p className="text-xs text-green-600 mt-1">Status: Logged In</p>}
                        </CardContent>
                    </Card>
                ))}
            </div>
            
            {/* Admin Profile Card (Detailed Information) */}
            <h2 className="text-2xl font-bold pt-4 text-gray-800">Admin Profile</h2>
            <Card className="max-w-xl shadow-2xl border-t-4 border-purple-600">
                <CardHeader>
                    <CardTitle className="text-xl text-purple-700">User Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-700">
                    
                    {/* ফিক্স: API থেকে আসা 'name' ফিল্ডটি সরাসরি ব্যবহার করা হয়েছে */}
                    <p><strong>Full Name:</strong> {adminInfo.name || 'N/A'}</p> 
                    
                    <p><strong>Email:</strong> <span className="text-blue-600 font-semibold">{adminInfo.email}</span></p>
                    <p><strong>Role:</strong> <span className="font-bold text-green-700">{adminInfo.role || 'Admin (Default)'}</span></p>
                    
                    {/* ফিক্স: API থেকে আসা 'id' ফিল্ডটি ব্যবহার করা হয়েছে */}
                    <p><strong>User ID:</strong> <span className="text-sm bg-gray-100 p-1 rounded">{adminInfo.id || 'N/A'}</span></p> 
                    
                    <p><strong>Status:</strong> <span className="text-sm bg-blue-100 text-blue-800 p-1 rounded-full">Active</span></p>
                </CardContent>
            </Card>

            <div className="pt-6">
                {/* <Button className="bg-red-600 hover:bg-red-700 font-semibold">Logout</Button> */}
                <a href="/projects" className="ml-4 text-indigo-600 hover:text-indigo-800 hover:underline font-semibold">Go to Project Management</a>
            </div>
        </div>
    );
}