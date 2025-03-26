
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, X, MinusIcon, ChevronRight } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{
    id: string;
    text: string;
    sender: 'user' | 'support';
    timestamp: Date;
  }[]>([
    {
      id: '1',
      text: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
      sender: 'support',
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showForm, setShowForm] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Ajouter le message de l'utilisateur
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user' as const,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simuler une réponse après un court délai
    setTimeout(() => {
      const responseMessage = {
        id: (Date.now() + 1).toString(),
        text: "Merci pour votre message. Un membre de notre équipe vous répondra dans les plus brefs délais.",
        sender: 'support' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  const handleStartChat = () => {
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Information manquante",
        description: "Veuillez remplir tous les champs pour démarrer la conversation.",
        variant: "destructive"
      });
      return;
    }

    setShowForm(false);
    toast({
      title: "Discussion démarrée",
      description: "Vous êtes maintenant connecté à notre service client."
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Bulle de chat flottante */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && !isMinimized && (
            <motion.div 
              className="absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* En-tête */}
              <div className="bg-pink-600 p-4 text-white flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2 border-2 border-white">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>S83</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Service client</h3>
                    <p className="text-xs text-pink-100">Sonorisation 83</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 text-white hover:bg-pink-500"
                    onClick={() => setIsMinimized(true)}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 text-white hover:bg-pink-500"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Corps de la discussion */}
              <div className="h-80 overflow-y-auto p-4 bg-gray-50">
                {showForm ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-center mb-2">Démarrer une conversation</h3>
                      <p className="text-sm text-gray-500 text-center mb-4">
                        Veuillez remplir ce formulaire pour commencer à discuter avec notre équipe.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium" htmlFor="chat-name">
                          Nom
                        </label>
                        <Input 
                          id="chat-name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium" htmlFor="chat-email">
                          Email
                        </label>
                        <Input 
                          id="chat-email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="votre@email.com"
                        />
                      </div>
                      <Button 
                        className="w-full"
                        onClick={handleStartChat}
                      >
                        Démarrer la discussion
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={cn(
                          "mb-4 max-w-[80%]",
                          msg.sender === 'user' ? "ml-auto" : "mr-auto"
                        )}
                      >
                        <div 
                          className={cn(
                            "rounded-lg p-3", 
                            msg.sender === 'user' 
                              ? "bg-pink-500 text-white" 
                              : "bg-white border border-gray-200"
                          )}
                        >
                          {msg.text}
                        </div>
                        <div 
                          className={cn(
                            "text-xs mt-1",
                            msg.sender === 'user' ? "text-right" : "text-left"
                          )}
                        >
                          {formatTime(msg.timestamp)}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Zone de saisie */}
              {!showForm && (
                <div className="p-3 border-t">
                  <div className="flex items-center">
                    <Textarea 
                      placeholder="Tapez votre message..." 
                      className="resize-none min-h-[40px] max-h-[120px]"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      size="icon" 
                      className="ml-2 h-9 w-9"
                      onClick={handleSendMessage}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isMinimized && (
            <motion.div
              className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-2 border border-gray-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <div className="bg-green-500 h-2 w-2 rounded-full"></div>
                <span>Discussion en cours</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 text-xs"
                  onClick={() => setIsMinimized(false)}
                >
                  Ouvrir
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button 
          size="icon" 
          className={`h-14 w-14 rounded-full shadow-lg ${isOpen ? 'bg-pink-700 hover:bg-pink-800' : 'bg-pink-600 hover:bg-pink-700'}`}
          onClick={() => {
            if (isMinimized) {
              setIsMinimized(false);
            } else {
              setIsOpen(!isOpen);
            }
          }}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </Button>
      </div>
    </>
  );
};

export default ChatBubble;
