
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MailQuestion, 
  MessageSquare, 
  Send,
  FileText,
  HelpCircle,
  Phone,
  Mail
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";

const CustomerSupport = () => {
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  
  // Données fictives pour la démo
  const supportTickets = [
    {
      id: "SUP-001",
      subject: "Problème avec une enceinte louée",
      date: "10/05/2023",
      status: "En cours",
      lastUpdate: "12/05/2023",
      messages: 3
    },
    {
      id: "SUP-002",
      subject: "Question sur une facture",
      date: "20/05/2023",
      status: "Résolu",
      lastUpdate: "21/05/2023",
      messages: 2
    }
  ];

  const faqs = [
    {
      question: "Comment fonctionnent les locations d'équipement ?",
      answer: "Nos locations sont disponibles pour des périodes minimales de 24h. Vous réservez en ligne, puis vous pouvez soit récupérer l'équipement à notre dépôt, soit opter pour la livraison et l'installation (service payant)."
    },
    {
      question: "Quelle est la politique en cas de dommage ?",
      answer: "Tous nos équipements sont vérifiés avant et après la location. En cas de dommage, une évaluation sera faite et des frais pourront être appliqués selon l'étendue des dégâts."
    },
    {
      question: "Comment puis-je obtenir une assistance technique pendant mon événement ?",
      answer: "Nous proposons un service d'assistance téléphonique 7j/7. Pour les événements importants, vous pouvez également réserver un technicien qui sera présent sur place."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      toast({
        title: "Message envoyé",
        description: "Notre équipe vous répondra dans les plus brefs délais.",
      });
      setMessage('');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-display font-semibold">Service après-vente et support</h2>
        <p className="text-gray-600">Assistance technique et support pour vos achats et locations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Contacter par téléphone</CardTitle>
            <Phone className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-center">04 82 29 50 62</p>
            <p className="text-xs text-gray-500 text-center">Lun-Ven, 9h-18h</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Support par email</CardTitle>
            <Mail className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-center">support@sonorisation83.fr</p>
            <p className="text-xs text-gray-500 text-center">Réponse sous 24h</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Chat en direct</CardTitle>
            <MessageSquare className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <Button className="w-full" size="sm">
              Démarrer une conversation
            </Button>
            <p className="text-xs text-gray-500 text-center mt-1">Disponible maintenant</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-pink-500" />
            Mes demandes récentes
          </h3>
          
          {supportTickets.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <MailQuestion className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <h3 className="font-medium">Aucune demande</h3>
              <p className="text-sm text-gray-500 mb-4">Vous n'avez pas encore de demandes de support</p>
            </div>
          ) : (
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {supportTickets.map((ticket) => (
                <motion.div 
                  key={ticket.id} 
                  variants={itemVariants}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{ticket.subject}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      ticket.status === "Résolu" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Ticket {ticket.id}</span>
                    <span>Dernière mise à jour: {ticket.lastUpdate}</span>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {ticket.messages} messages
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          <div className="mt-4">
            <Button className="w-full">
              <MailQuestion className="h-4 w-4 mr-2" />
              Nouvelle demande
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-pink-500" />
            Contactez-nous
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="subject">
                Sujet
              </label>
              <Input id="subject" placeholder="Sujet de votre message" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="message">
                Message
              </label>
              <Textarea 
                id="message" 
                placeholder="Comment pouvons-nous vous aider ?" 
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            
            <Button type="submit" className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Envoyer
            </Button>
          </form>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <HelpCircle className="h-5 w-5 mr-2 text-pink-500" />
          Questions fréquentes
        </h3>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">{faq.question}</h4>
              <p className="text-sm text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
