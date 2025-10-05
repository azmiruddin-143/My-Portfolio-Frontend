import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'; // <-- এটি যুক্ত করা হলো
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// const AUTH_TOKEN_KEY = "token"; 
// const LOGIN_ROUTE = '/login'; 

// এটি একটি Server Component
export default async function DashboardPage() {
    
    // const token = (await cookies()).get(AUTH_TOKEN_KEY)?.value;
    // if (!token) {
   
    //     redirect(LOGIN_ROUTE);
    // }

    let userData = null;
    try {
        const verifyResponse = await fetch('http://localhost:5000/api/v1/auth/me', {
            method: 'GET',
            headers: { 'Authorization': `Bearer` },
            cache: 'no-store'
        });

        if (verifyResponse.ok) {
            const result = await verifyResponse.json();
            userData = result.data;
        } else {
             // টোকেন ভুল হলে বা মেয়াদ উত্তীর্ণ হলে
             // এখানেও রিডাইরেক্ট করে দেওয়াই নিরাপদ।
            //  redirect(LOGIN_ROUTE);
        }

    } catch (error) {
        // API কল ফেইল করলে বা নেটওয়ার্ক এরর হলে
        return <div className='p-8 text-red-600'>Failed to connect to the backend API. Please check server status.</div>;
    }

    if (!userData) {
        // ডেটা ফেচ সফল হলেও যদি ইউজার ডেটা না থাকে
        return <div className='p-8'>User data is missing. Please contact support.</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">Admin Dashboard Overview</h1>
            <Card className="max-w-md shadow-lg border-t-4 border-blue-500">
                <CardHeader>
                    <CardTitle className="text-2xl text-blue-600">Welcome, Admin!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p><strong>Name:</strong> {userData.name || 'N/A'}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Role:</strong> <span className="font-bold text-green-600">{userData.role || 'Admin'}</span></p>
                    <p><strong>User ID:</strong> {userData.userId}</p>
                </CardContent>
            </Card>
            {/* Note: The Logout button logic must be in a Client Component */}
            <Button className="mt-6 bg-red-600 hover:bg-red-700">Logout (Implement in Client Component)</Button>
            <p className="mt-4">Go to <a href="/projects" className="text-indigo-600 hover:underline font-semibold">Project Management</a></p>
        </div>
    );
}