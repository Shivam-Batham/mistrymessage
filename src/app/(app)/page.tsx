'use client';


import { Mail } from 'lucide-react'; // Assuming you have an icon for messages
import { Card, CardDescription, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { ApiResponse, getUser } from '@/types/ApiResponse';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  const [users, setUsers] = useState<getUser[]>();
  const getAllUsers = async () => {
    try {
      const response = await axios.get<ApiResponse>("/api/get-users");
      if (response.status === 200) {
        setUsers(response.data.users);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message setting",
        variant: "destructive",
      });
    }
  }
  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <>
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-purple-50">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Mystrius Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            True Appriciation - Where your identity remains a secret.
          </p>
        </section>

        {/* Carousel for Messages */}
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card className='border-black rounded m-2 '>
                  <CardHeader>
                    <CardTitle>{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>
      <section id='users' className="w-[100%] bg-blue-400">
        {users?.map((user) => (

          <Card key={user.username} className='border-black rounded m-4 bg-white'>
            <CardHeader>
              <CardTitle className='border-black rounded  ' onClick={() => router.replace(`/u/${user.username}`)}>@ {user.username}</CardTitle>
              <CardDescription>SDE</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
              <Mail className="flex-shrink-0" />
              <div>
                <p>Would you like send meassage!</p>
                <p className="text-xs text-muted-foreground">
                1 day ago
                </p>
              </div>
            </CardContent>
          </Card>

        ))}
      </section>
      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        © 2025 Mystry Messages. All rights reserved.
      </footer>
    </>
  );
}