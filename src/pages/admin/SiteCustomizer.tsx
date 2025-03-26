
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ColorPicker } from "@/components/ui/color-picker";
import { toast } from "sonner";
import { 
  Palette, 
  Type, 
  Layout, 
  Image, 
  Sliders, 
  LayoutGrid, 
  Check,
  Undo, 
  Save,
  Eye
} from "lucide-react";

// Composant ColorPicker personnalisé pour l'interface
const ColorPicker = ({ label, value, onChange, id }: { label: string, value: string, onChange: (value: string) => void, id: string }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex space-x-2 items-center">
        <div 
          className="h-8 w-8 rounded-md border shadow-sm" 
          style={{ backgroundColor: value }}
        />
        <Input
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-8 p-0 overflow-hidden"
        />
        <Input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-28"
        />
      </div>
    </div>
  );
};

const SiteCustomizer = () => {
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("colors");
  
  // État pour les différentes personnalisations
  const [colors, setColors] = useState({
    primary: "#EC4899",
    secondary: "#D7B973",
    background: "#FFFFFF",
    text: "#333333",
    accent: "#A17D1A"
  });
  
  const [typography, setTypography] = useState({
    baseFont: "Inter",
    headingFont: "Playfair Display",
    baseSize: 16,
    headingWeight: "600",
    paragraphSpacing: 1.5
  });
  
  const [layout, setLayout] = useState({
    containerWidth: 1400,
    useFullWidth: false,
    spacing: "4",
    borderRadius: 8
  });
  
  const [components, setComponents] = useState({
    buttonStyle: "rounded",
    cardStyle: "shadow",
    useGlassmorphism: true,
    navbarTransparent: true
  });

  const handleColorChange = (key: string, value: string) => {
    setColors({
      ...colors,
      [key]: value
    });
  };

  const handleTypographyChange = (key: string, value: string | number) => {
    setTypography({
      ...typography,
      [key]: value
    });
  };

  const handleLayoutChange = (key: string, value: number | boolean | string) => {
    setLayout({
      ...layout,
      [key]: value
    });
  };

  const handleComponentsChange = (key: string, value: string | boolean) => {
    setComponents({
      ...components,
      [key]: value
    });
  };

  const saveChanges = () => {
    setSaving(true);
    
    // Simulation de sauvegarde
    setTimeout(() => {
      setSaving(false);
      toast.success("Modifications enregistrées avec succès");
      
      // Dans une vraie implémentation, nous sauvegarderions ces configurations
      console.log("Saved configuration:", { colors, typography, layout, components });
    }, 1000);
  };
  
  const resetChanges = () => {
    // Remise à zéro de tous les paramètres
    setColors({
      primary: "#EC4899",
      secondary: "#D7B973",
      background: "#FFFFFF",
      text: "#333333",
      accent: "#A17D1A"
    });
    
    setTypography({
      baseFont: "Inter",
      headingFont: "Playfair Display",
      baseSize: 16,
      headingWeight: "600",
      paragraphSpacing: 1.5
    });
    
    setLayout({
      containerWidth: 1400,
      useFullWidth: false,
      spacing: "4",
      borderRadius: 8
    });
    
    setComponents({
      buttonStyle: "rounded",
      cardStyle: "shadow",
      useGlassmorphism: true,
      navbarTransparent: true
    });
    
    toast.info("Paramètres réinitialisés");
  };

  const previewChanges = () => {
    toast.info("Fonctionnalité de prévisualisation à venir");
    // Dans une implémentation réelle, nous pourrions ouvrir une iframe 
    // ou un nouvel onglet avec les changements appliqués
  };

  // Prévisualisation en direct des styles
  const previewStyle = {
    fontFamily: typography.baseFont,
    backgroundColor: colors.background,
    color: colors.text,
    borderRadius: `${layout.borderRadius}px`,
    padding: `${layout.spacing}rem`,
    boxShadow: components.cardStyle === 'shadow' ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
    border: components.cardStyle === 'border' ? `1px solid ${colors.primary}20` : 'none',
    background: components.useGlassmorphism ? `${colors.background}CC` : colors.background,
    backdropFilter: components.useGlassmorphism ? 'blur(10px)' : 'none'
  };

  const buttonPreviewStyle = {
    backgroundColor: colors.primary,
    color: '#FFFFFF',
    fontFamily: typography.baseFont,
    borderRadius: components.buttonStyle === 'rounded' 
      ? '9999px' 
      : components.buttonStyle === 'squared' 
        ? '0px' 
        : `${layout.borderRadius}px`,
    padding: '0.5rem 1rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '14px',
    transition: 'all 0.2s'
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Personnalisation de site</h1>
          <p className="text-gray-600">Modifiez l'apparence et le comportement de votre site</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={resetChanges}>
            <Undo className="mr-2 h-4 w-4" />
            Réinitialiser
          </Button>
          <Button variant="outline" onClick={previewChanges}>
            <Eye className="mr-2 h-4 w-4" />
            Prévisualiser
          </Button>
          <Button onClick={saveChanges} disabled={saving}>
            {saving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="colors" className="flex items-center">
                <Palette className="h-4 w-4 mr-2" />
                <span>Couleurs</span>
              </TabsTrigger>
              <TabsTrigger value="typography" className="flex items-center">
                <Type className="h-4 w-4 mr-2" />
                <span>Typographie</span>
              </TabsTrigger>
              <TabsTrigger value="layout" className="flex items-center">
                <Layout className="h-4 w-4 mr-2" />
                <span>Mise en page</span>
              </TabsTrigger>
              <TabsTrigger value="components" className="flex items-center">
                <LayoutGrid className="h-4 w-4 mr-2" />
                <span>Composants</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="colors" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Palette de couleurs</CardTitle>
                  <CardDescription>
                    Définissez les couleurs principales de votre site
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ColorPicker 
                    label="Couleur principale" 
                    value={colors.primary} 
                    onChange={(value) => handleColorChange('primary', value)}
                    id="primary-color"
                  />
                  <ColorPicker 
                    label="Couleur secondaire" 
                    value={colors.secondary} 
                    onChange={(value) => handleColorChange('secondary', value)}
                    id="secondary-color"
                  />
                  <ColorPicker 
                    label="Couleur d'arrière-plan" 
                    value={colors.background} 
                    onChange={(value) => handleColorChange('background', value)}
                    id="background-color"
                  />
                  <ColorPicker 
                    label="Couleur du texte" 
                    value={colors.text} 
                    onChange={(value) => handleColorChange('text', value)}
                    id="text-color"
                  />
                  <ColorPicker 
                    label="Couleur d'accent" 
                    value={colors.accent} 
                    onChange={(value) => handleColorChange('accent', value)}
                    id="accent-color"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="typography" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Typographie</CardTitle>
                  <CardDescription>
                    Personnalisez les polices et les styles de texte
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="baseFont">Police principale</Label>
                      <Select 
                        value={typography.baseFont}
                        onValueChange={(value) => handleTypographyChange('baseFont', value)}
                      >
                        <SelectTrigger id="baseFont">
                          <SelectValue placeholder="Sélectionnez une police" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Inter">Inter</SelectItem>
                          <SelectItem value="Roboto">Roboto</SelectItem>
                          <SelectItem value="Poppins">Poppins</SelectItem>
                          <SelectItem value="Montserrat">Montserrat</SelectItem>
                          <SelectItem value="Open Sans">Open Sans</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="headingFont">Police des titres</Label>
                      <Select 
                        value={typography.headingFont}
                        onValueChange={(value) => handleTypographyChange('headingFont', value)}
                      >
                        <SelectTrigger id="headingFont">
                          <SelectValue placeholder="Sélectionnez une police" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                          <SelectItem value="Montserrat">Montserrat</SelectItem>
                          <SelectItem value="Raleway">Raleway</SelectItem>
                          <SelectItem value="Merriweather">Merriweather</SelectItem>
                          <SelectItem value="Lora">Lora</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Taille de police de base</Label>
                      <span className="text-sm text-gray-500">{typography.baseSize}px</span>
                    </div>
                    <Slider
                      value={[typography.baseSize]}
                      onValueChange={(value) => handleTypographyChange('baseSize', value[0])}
                      min={12}
                      max={20}
                      step={1}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="headingWeight">Graisse des titres</Label>
                      <Select 
                        value={typography.headingWeight}
                        onValueChange={(value) => handleTypographyChange('headingWeight', value)}
                      >
                        <SelectTrigger id="headingWeight">
                          <SelectValue placeholder="Sélectionnez une graisse" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="400">Normal (400)</SelectItem>
                          <SelectItem value="500">Medium (500)</SelectItem>
                          <SelectItem value="600">Semi-Bold (600)</SelectItem>
                          <SelectItem value="700">Bold (700)</SelectItem>
                          <SelectItem value="800">Extra-Bold (800)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <Label>Espacement des paragraphes</Label>
                        <span className="text-sm text-gray-500">{typography.paragraphSpacing}</span>
                      </div>
                      <Slider
                        value={[typography.paragraphSpacing]}
                        onValueChange={(value) => handleTypographyChange('paragraphSpacing', value[0])}
                        min={1}
                        max={2.5}
                        step={0.1}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="layout" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mise en page</CardTitle>
                  <CardDescription>
                    Configurez la structure et la disposition de votre site
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Largeur du conteneur</Label>
                      <span className="text-sm text-gray-500">{layout.containerWidth}px</span>
                    </div>
                    <Slider
                      value={[layout.containerWidth]}
                      onValueChange={(value) => handleLayoutChange('containerWidth', value[0])}
                      min={900}
                      max={1920}
                      step={10}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="useFullWidth"
                      checked={layout.useFullWidth}
                      onCheckedChange={(checked) => handleLayoutChange('useFullWidth', checked)}
                    />
                    <Label htmlFor="useFullWidth">Utiliser la largeur complète de l'écran</Label>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="spacing">Espacement</Label>
                      <Select 
                        value={layout.spacing}
                        onValueChange={(value) => handleLayoutChange('spacing', value)}
                      >
                        <SelectTrigger id="spacing">
                          <SelectValue placeholder="Sélectionnez un espacement" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">Compact</SelectItem>
                          <SelectItem value="4">Normal</SelectItem>
                          <SelectItem value="6">Large</SelectItem>
                          <SelectItem value="8">Très large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <Label>Rayon des bordures</Label>
                        <span className="text-sm text-gray-500">{layout.borderRadius}px</span>
                      </div>
                      <Slider
                        value={[layout.borderRadius]}
                        onValueChange={(value) => handleLayoutChange('borderRadius', value[0])}
                        min={0}
                        max={20}
                        step={1}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="components" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Composants</CardTitle>
                  <CardDescription>
                    Personnalisez l'apparence des éléments d'interface
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="buttonStyle">Style des boutons</Label>
                      <Select 
                        value={components.buttonStyle}
                        onValueChange={(value) => handleComponentsChange('buttonStyle', value)}
                      >
                        <SelectTrigger id="buttonStyle">
                          <SelectValue placeholder="Sélectionnez un style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rounded">Arrondi</SelectItem>
                          <SelectItem value="pill">Pilule</SelectItem>
                          <SelectItem value="squared">Carré</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardStyle">Style des cartes</Label>
                      <Select 
                        value={components.cardStyle}
                        onValueChange={(value) => handleComponentsChange('cardStyle', value)}
                      >
                        <SelectTrigger id="cardStyle">
                          <SelectValue placeholder="Sélectionnez un style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shadow">Ombre portée</SelectItem>
                          <SelectItem value="border">Bordure</SelectItem>
                          <SelectItem value="flat">Plat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="useGlassmorphism"
                      checked={components.useGlassmorphism}
                      onCheckedChange={(checked) => handleComponentsChange('useGlassmorphism', checked)}
                    />
                    <Label htmlFor="useGlassmorphism">Activer l'effet de verre (glassmorphism)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="navbarTransparent"
                      checked={components.navbarTransparent}
                      onCheckedChange={(checked) => handleComponentsChange('navbarTransparent', checked)}
                    />
                    <Label htmlFor="navbarTransparent">Barre de navigation transparente</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Aperçu en direct</CardTitle>
                <CardDescription>
                  Visualisez les changements en temps réel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div style={previewStyle} className="p-4 transition-all duration-300">
                  <h3 style={{ 
                    fontFamily: typography.headingFont,
                    fontWeight: typography.headingWeight,
                    color: colors.primary,
                    marginBottom: '1rem'
                  }}>
                    Titre d'exemple
                  </h3>
                  <p style={{ marginBottom: '1rem', lineHeight: `${typography.paragraphSpacing}` }}>
                    Voici un exemple de texte qui montre comment les différents styles sont appliqués sur le site.
                  </p>
                  <button style={buttonPreviewStyle}>
                    Bouton d'exemple
                  </button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Configuration actuelle</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Thème</h4>
                    <div className="flex mt-2 space-x-2">
                      {Object.entries(colors).map(([key, color]) => (
                        <div 
                          key={key}
                          className="h-6 w-6 rounded-full border"
                          style={{ backgroundColor: color }}
                          title={key}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Police</h4>
                    <p className="text-sm">{typography.baseFont} / {typography.headingFont}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Mise en page</h4>
                    <p className="text-sm">
                      {layout.containerWidth}px • 
                      {layout.useFullWidth ? ' Pleine largeur' : ' Conteneur'} •
                      Rayon: {layout.borderRadius}px
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Composants</h4>
                    <p className="text-sm">
                      Boutons: {components.buttonStyle} •
                      Cartes: {components.cardStyle} •
                      {components.useGlassmorphism ? ' Glassmorphism' : ' Standard'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteCustomizer;
