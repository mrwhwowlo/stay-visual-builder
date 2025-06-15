
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type ContactMessage = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
};

const ContactMessagesAdmin: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({
        title: "Fel",
        description: "Kunde inte hämta meddelanden.",
        variant: "destructive",
      });
    } else {
      setMessages(data);
    }
    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from("contact_messages")
      .update({ is_read: true })
      .eq("id", id);
    if (!error) {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
      );
    }
  };

  useEffect(() => {
    fetchMessages();
    // Optionally, subscribe to changes
    // return () => {}; // cleanup
    // eslint-disable-next-line
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kontaktmeddelanden</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Laddar...</div>
        ) : messages.length === 0 ? (
          <div>Inga kontaktmeddelanden.</div>
        ) : (
          <div className="space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-4 rounded border ${msg.is_read ? "bg-gray-50" : "bg-green-50 border-green-300"}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold">{msg.name}</span>{" "}
                    <span className="text-xs text-muted-foreground">&lt;{msg.email}&gt;</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{new Date(msg.created_at).toLocaleString()}</div>
                </div>
                <div className="mt-2 whitespace-pre-line">{msg.message}</div>
                <div className="flex items-center gap-2 mt-3">
                  {!msg.is_read && (
                    <Button
                      size="sm"
                      onClick={() => markAsRead(msg.id)}
                    >
                      Markera som läst
                    </Button>
                  )}
                  {msg.is_read && (
                    <span className="text-xs text-green-700">Läst</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactMessagesAdmin;
