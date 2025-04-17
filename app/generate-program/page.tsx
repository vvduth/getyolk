"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { vapi } from "@/lib/vapi";
import { useUser } from "@clerk/nextjs";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import React from "react";

const GenerataProgramPage = () => {
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [callEnded, setCallEnded] = useState(false);

  const { user } = useUser();
  const router = useRouter();

  // SOLUTION to get rid of "Meeting has ended" error
  useEffect(() => {
    const originalError = console.error;
    // override console.error to ignore "Meeting has ended" errors
    console.error = function (msg, ...args) {
      if (
        msg &&
        (msg.includes("Meeting has ended") ||
          (args[0] && args[0].toString().includes("Meeting has ended")))
      ) {
        console.log("Ignoring known error: Meeting has ended");
        return; // don't pass to original handler
      }

      // pass all other errors to the original handler
      return originalError.call(console, msg, ...args);
    };

    // restore original handler on unmount
    return () => {
      console.error = originalError;
    };
  }, []);
  
  // auto-scroll messages
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // navigate user to profile page after the call ends
  useEffect(() => {
    if (callEnded) {
      const redirectTimer = setTimeout(() => {
        router.push("/profile");
      }, 1500);

      return () => clearTimeout(redirectTimer);
    }
  }, [callEnded, router]);

  // setup event listeners for vapi
  useEffect(() => {
    const handleCallStart = () => {
      console.log("Call started");
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
    };

    const handleCallEnd = () => {
      console.log("Call ended");
      setCallActive(false);
      setConnecting(false);
      setIsSpeaking(false);
      setCallEnded(true);
    };

    const handleSpeechStart = () => {
      console.log("AI started Speaking");
      setIsSpeaking(true);
    };

    const handleSpeechEnd = () => {
      console.log("AI stopped Speaking");
      setIsSpeaking(false);
    };
    const handleMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { content: message.transcript, role: message.role };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const handleError = (error: any) => {
      console.log("Vapi Error", error);
      setConnecting(false);
      setCallActive(false);
    };

    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage)
      .on("error", handleError);

    // cleanup event listeners on unmount
    return () => {
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage)
        .off("error", handleError);
    };
  }, []);

  const toggleCall = async () => {
    if (callActive) {
      vapi.stop();
    } else {
      try {
        setConnecting(true);
        setMessages([]);
        setCallEnded(false);

        const fullName = user?.firstName
          ? `${user.firstName} ${user.lastName || ""}`.trim()
          : "There";

        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
          variableValues: {
            full_name: fullName,
            user_id: user?.id,
          },
        });
      } catch (error) {
        console.log("Failed to start call", error);
        setConnecting(false);
      }
    }
  };

  const messageContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden  pb-6 pt-24">
      <div className="container mx-auto px-4 h-full max-w-5xl">
        <h1 className="text-3xl font-bold font-mono">
          <span>Generate Your </span>
          <span className="text-sky-500 uppercase">Fitness Program</span>
        </h1>
        <p className="mt-2">
          Have a voice conversation with our AI assistant to create your
          personalized plan
        </p>
      </div>

      {/* VIDEO CALL AREA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* ai card */}
        <Card className="bg-sky-300 border overflow-hidden relative mt-2">
          <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
            {/* ai voice animatio */}
            <div
              className={clsx(
                "absolute inset-0 transition-opacity duration-300",
                isSpeaking ? "opacity-30" : "opacity-0"
              )}
            >
              {/* wave */}
              <div className="left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center items-center h-20">
                <p className="text-gray-900 font-bold">I am talking...</p>
              </div>
            </div>
            {/* ai avatar */}
            <div className="relative size-32 mb-4">
              <div
                className={`absolute inset-0 bg-green-200 opacity-10 rounded-full blur-lg ${
                  isSpeaking ? "animate-pulse" : ""
                }`}
              />
              <div
                className="relative w-full h-full rounded-full 
              bg-card flex items-center justify-center border 
              border-border overflow-hidden"
              >
                <div className="absolute inset-0"></div>
                <img
                  src="https://images.unsplash.com/photo-1739813498570-f0ef6ee15b81?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="AI Assistant"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h2 className="text-xl font-bold">Get yolk</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Strength & Conditioning Coach
              <span className="font-semibold"> & nutritionist</span>
            </p>

            {/* SPEAKING INDICATOR */}

            <div
              className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border ${
                isSpeaking ? "border-primary" : ""
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isSpeaking ? "bg-primary animate-pulse" : "bg-muted"
                }`}
              />

              <span className="text-xs text-muted-foreground">
                {isSpeaking
                  ? "Speaking..."
                  : callActive
                    ? "Listening..."
                    : callEnded
                      ? "Redirecting to profile..."
                      : "Waiting..."}
              </span>
            </div>
          </div>
        </Card>
        {/* user card */}
        <Card className={`mt-2 border overflow-hidden relative`}>
          <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
            {/* User Image */}
            <div className="relative size-32 mb-4">
              <img
                src={user?.imageUrl}
                alt="User"
                className="object-cover rounded-full"
              />
            </div>

            <h2 className="text-xl font-bold text-foreground">You</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {user
                ? (user.firstName + " " + (user.lastName || "")).trim()
                : "Guest"}
            </p>

            {/* User Ready Text */}
            <div
              className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border`}
            >
              <div className={`w-2 h-2 rounded-full bg-muted`} />
              <span className="text-xs text-muted-foreground">Ready</span>
            </div>
          </div>
        </Card>
      </div>
      {/* MESSAGE COINTER  */}
      {messages.length > 0 && (
        <div
          ref={messageContainerRef}
          className="w-full  border border-gray-900 shadow-lg
        rounded-xl p-4 mb-8 h-64 overflow-y-auto 
        transition-all duration-300 scroll-smooth"
        >
          <div className="space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className="message-item animate-fadeIn">
                <div className="font-semibold text-xs text-muted-foreground mb-1">
                  {msg.role === "assistant" ? "CodeFlex AI" : "You"}:
                </div>
                <p className="text-foreground">{msg.content}</p>
              </div>
            ))}
            {callEnded && (
              <div className="message-item animate-fadeIn">
                <div className="font-semibold text-xs text-primary mb-1">
                  System:
                </div>
                <p className="text-foreground">
                  Your fitness program has been created! Redirecting to your
                  profile...
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CALL CONTROLS */}
      <div className="w-full flex justify-center gap-4">
        <Button
          className={`w-40 text-xl rounded-3xl ${
            callActive
              ? "bg-rose-600 hover:bg-destructive/90"
              : callEnded
                ? "bg-green-600 hover:bg-green-700"
                : "bg-primary hover:bg-primary/40"
          } text-white relative`}
          onClick={toggleCall}
          disabled={connecting || callEnded}
        >
          <span>
            {callActive
              ? "End Call"
              : connecting
                ? "Connecting..."
                : callEnded
                  ? "View Profile"
                  : "Start Call"}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default GenerataProgramPage;
