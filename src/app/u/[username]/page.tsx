'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';


export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;
  const router = useRouter();
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch('content');

  // const handleMessageClick = (message: string) => {
  //   form.setValue('content', message);
  // };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        ...data,
        username,
      }); 
      if(response.status == 200){
        toast({
            title: response.data.message,
            variant: 'default',
          });
          form.reset({ ...form.getValues(), content: '' });
      }
      
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to sent message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="container mx-auto my-5 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Public Profile Link
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none rounded"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isLoading ? (
              <Button disabled className="w-full bg-black rounded-[8px] text-white hover:text-black hover:border">
                <Loader2 className="mr-2 h-4 w-4 animate-spin bg-white" />
                Please wait
              </Button>
            ) : (
              <Button  className="s bg-black rounded-[8px] text-white hover:text-black hover:border" type="submit" disabled={isLoading || !messageContent}>
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>

      
      <Separator className="my-6" />
      <div className="text-center">
        {/* <div className="mb-4">Get Your Message Board</div> */}
        <Link href={'/sign-up'}>
          <Button  onClick={()=>{router.replace("/sign-in")}} >Create Your Account</Button>
        </Link>
      </div>
    </div>
  );
}