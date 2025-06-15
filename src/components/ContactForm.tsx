
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ContactForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const reset = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let user_id: string | null = null;
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) user_id = session.user.id;

      const { error } = await supabase
        .from("contact_messages")
        .insert([
          {
            name,
            email,
            message,
            user_id: user_id ?? null,
            is_read: false,
          },
        ]);
      if (error) throw error;

      toast({
        title: "Tack för ditt meddelande!",
        description: "Vi har tagit emot ditt meddelande och återkommer snart.",
      });
      reset();
      setOpen(false);
    } catch (err: any) {
      toast({
        title: "Fel vid skickande",
        description: err.message || "Kunde inte skicka meddelandet.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="secondary" className="w-full md:w-auto">
          Kontakta värden
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kontakta värden</DialogTitle>
          <DialogDescription>
            Skicka ett meddelande till värden. Vi svarar vanligtvis inom 24 timmar.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Input
              placeholder="Ditt namn"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Din e-post"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <Textarea
              placeholder="Skriv ditt meddelande här..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
              disabled={loading}
            />
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? "Skickar..." : "Skicka meddelande"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;
