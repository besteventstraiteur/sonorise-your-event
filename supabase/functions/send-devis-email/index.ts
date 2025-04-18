
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface DevisData {
  nom: string;
  email: string;
  telephone: string;
  typeEvenement: string;
  typePrestation: string;
  dateEvenement: string;
  nombrePersonnes?: string;
  lieu?: string;
  commentaire?: string;
}

const COMPANY_NAME = "Sonorisation 83";
const ADMIN_EMAIL = "contact@sonorisation83.com";

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const devisData: DevisData = await req.json();
    const formattedDate = new Date(devisData.dateEvenement).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    console.log('Envoi email admin pour:', devisData.email);
    // Email to admin
    await resend.emails.send({
      from: `${COMPANY_NAME} <onboarding@resend.dev>`,
      to: ADMIN_EMAIL,
      subject: `Nouvelle demande de devis - ${devisData.typeEvenement}`,
      html: `
        <h1>Nouvelle demande de devis</h1>
        <h2>Informations client</h2>
        <p><strong>Nom:</strong> ${devisData.nom}</p>
        <p><strong>Email:</strong> ${devisData.email}</p>
        <p><strong>Téléphone:</strong> ${devisData.telephone}</p>
        
        <h2>Détails de l'événement</h2>
        <p><strong>Type d'événement:</strong> ${devisData.typeEvenement}</p>
        <p><strong>Type de prestation:</strong> ${devisData.typePrestation}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        ${devisData.nombrePersonnes ? `<p><strong>Nombre de personnes:</strong> ${devisData.nombrePersonnes}</p>` : ''}
        ${devisData.lieu ? `<p><strong>Lieu:</strong> ${devisData.lieu}</p>` : ''}
        ${devisData.commentaire ? `<p><strong>Commentaire:</strong> ${devisData.commentaire}</p>` : ''}
      `,
    });

    console.log('Envoi email confirmation client:', devisData.email);
    // Confirmation email to client
    await resend.emails.send({
      from: `${COMPANY_NAME} <onboarding@resend.dev>`,
      to: [devisData.email],
      subject: `Confirmation de votre demande de devis - ${COMPANY_NAME}`,
      html: `
        <h1>Merci pour votre demande de devis !</h1>
        <p>Cher(e) ${devisData.nom},</p>
        <p>Nous avons bien reçu votre demande de devis pour votre ${devisData.typeEvenement} prévu le ${formattedDate}.</p>
        <p>Notre équipe va étudier votre demande et reviendra vers vous dans les plus brefs délais avec une proposition détaillée.</p>
        <p>Voici un récapitulatif de votre demande :</p>
        <ul>
          <li>Type d'événement : ${devisData.typeEvenement}</li>
          <li>Type de prestation : ${devisData.typePrestation}</li>
          <li>Date : ${formattedDate}</li>
          ${devisData.nombrePersonnes ? `<li>Nombre de personnes : ${devisData.nombrePersonnes}</li>` : ''}
          ${devisData.lieu ? `<li>Lieu : ${devisData.lieu}</li>` : ''}
        </ul>
        <p>Si vous avez des questions, n'hésitez pas à nous contacter par téléphone ou email.</p>
        <p>Cordialement,<br>L'équipe ${COMPANY_NAME}</p>
      `,
    });

    console.log('Emails envoyés avec succès');
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);
