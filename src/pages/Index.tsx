import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Bouquet {
  id: number;
  title: string;
  description: string;
  composition: string;
  type: string;
  image: string;
}

const Index = () => {
  const { toast } = useToast();
  const [bouquets, setBouquets] = useState<Bouquet[]>([
    {
      id: 1,
      title: 'Розовая нежность',
      description: 'Элегантная композиция из розовых роз с зеленью',
      composition: 'Розы розовые - 15 шт, Эвкалипт - 5 веток, Зелень декоративная',
      type: 'Романтический',
      image: 'https://cdn.poehali.dev/projects/01ee1f74-fb6a-42a7-af8c-1c8c8c921479/files/c26750b8-b79d-46c1-83d4-d6650796228e.jpg'
    },
    {
      id: 2,
      title: 'Весенний микс',
      description: 'Яркая весенняя композиция с тюльпанами',
      composition: 'Тюльпаны - 10 шт, Ромашки - 7 шт, Хризантемы - 5 шт',
      type: 'Сезонный',
      image: 'https://cdn.poehali.dev/projects/01ee1f74-fb6a-42a7-af8c-1c8c8c921479/files/ad97c6a5-7619-4372-90de-6d0005a93fa1.jpg'
    },
    {
      id: 3,
      title: 'Свадебная классика',
      description: 'Роскошный свадебный букет в белых тонах',
      composition: 'Розы белые - 12 шт, Эвкалипт - 7 веток, Гипсофила, Лента атласная',
      type: 'Свадебный',
      image: 'https://cdn.poehali.dev/projects/01ee1f74-fb6a-42a7-af8c-1c8c8c921479/files/5a70f04b-7f30-4964-bd72-3e74e16f512e.jpg'
    }
  ]);

  const [newBouquet, setNewBouquet] = useState({
    title: '',
    description: '',
    composition: '',
    type: '',
    image: ''
  });

  const bouquetTypes = [
    { name: 'Романтический', icon: 'Heart', description: 'Нежные композиции для особых моментов' },
    { name: 'Свадебный', icon: 'Sparkles', description: 'Роскошные букеты для торжества' },
    { name: 'Сезонный', icon: 'Sun', description: 'Букеты из сезонных цветов' },
    { name: 'Корпоративный', icon: 'Briefcase', description: 'Строгие и элегантные композиции' }
  ];

  const flowerCatalog = [
    { name: 'Роза', color: 'Красная, Розовая, Белая', season: 'Круглый год' },
    { name: 'Тюльпан', color: 'Красный, Желтый, Розовый', season: 'Весна' },
    { name: 'Хризантема', color: 'Белая, Желтая, Сиреневая', season: 'Осень' },
    { name: 'Эвкалипт', color: 'Зеленый', season: 'Круглый год' },
    { name: 'Гипсофила', color: 'Белая', season: 'Круглый год' },
    { name: 'Ромашка', color: 'Белая', season: 'Лето' }
  ];

  const handleAddBouquet = () => {
    if (!newBouquet.title || !newBouquet.composition) {
      toast({
        title: 'Ошибка',
        description: 'Заполните название и состав букета',
        variant: 'destructive'
      });
      return;
    }

    const bouquet: Bouquet = {
      id: Date.now(),
      ...newBouquet
    };

    setBouquets([bouquet, ...bouquets]);
    setNewBouquet({
      title: '',
      description: '',
      composition: '',
      type: '',
      image: ''
    });

    toast({
      title: 'Успешно!',
      description: 'Букет добавлен в галерею'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-green-50">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Florabook
            </h1>
            <div className="hidden md:flex gap-6">
              <a href="#home" className="text-foreground hover:text-primary transition-colors">Главная</a>
              <a href="#gallery" className="text-foreground hover:text-primary transition-colors">Галерея</a>
              <a href="#types" className="text-foreground hover:text-primary transition-colors">Виды композиций</a>
              <a href="#catalog" className="text-foreground hover:text-primary transition-colors">Каталог цветов</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">Контакты</a>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Icon name="Plus" size={18} />
                  Добавить букет
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl">Добавить новый букет</DialogTitle>
                  <DialogDescription>
                    Заполните информацию о вашей композиции
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="title">Название букета</Label>
                    <Input
                      id="title"
                      placeholder="Например: Летний бриз"
                      value={newBouquet.title}
                      onChange={(e) => setNewBouquet({ ...newBouquet, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      placeholder="Краткое описание букета"
                      value={newBouquet.description}
                      onChange={(e) => setNewBouquet({ ...newBouquet, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="composition">Состав композиции</Label>
                    <Textarea
                      id="composition"
                      placeholder="Перечислите цветы и количество"
                      value={newBouquet.composition}
                      onChange={(e) => setNewBouquet({ ...newBouquet, composition: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Тип букета</Label>
                    <Input
                      id="type"
                      placeholder="Например: Романтический"
                      value={newBouquet.type}
                      onChange={(e) => setNewBouquet({ ...newBouquet, type: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">URL изображения</Label>
                    <Input
                      id="image"
                      placeholder="https://example.com/image.jpg"
                      value={newBouquet.image}
                      onChange={(e) => setNewBouquet({ ...newBouquet, image: e.target.value })}
                    />
                  </div>
                  <Button onClick={handleAddBouquet} className="w-full gap-2">
                    <Icon name="Check" size={18} />
                    Добавить в галерею
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      <section id="home" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in">
            Галерея цветочных
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              композиций
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in">
            Создавайте, публикуйте и делитесь своими уникальными букетами с подробным описанием состава
          </p>
          <div className="flex gap-4 justify-center animate-scale-in">
            <Button size="lg" className="gap-2" onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}>
              <Icon name="Flower2" size={20} />
              Смотреть галерею
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline" className="gap-2">
                  <Icon name="Plus" size={20} />
                  Добавить букет
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl">Добавить новый букет</DialogTitle>
                  <DialogDescription>
                    Заполните информацию о вашей композиции
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="title2">Название букета</Label>
                    <Input
                      id="title2"
                      placeholder="Например: Летний бриз"
                      value={newBouquet.title}
                      onChange={(e) => setNewBouquet({ ...newBouquet, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description2">Описание</Label>
                    <Textarea
                      id="description2"
                      placeholder="Краткое описание букета"
                      value={newBouquet.description}
                      onChange={(e) => setNewBouquet({ ...newBouquet, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="composition2">Состав композиции</Label>
                    <Textarea
                      id="composition2"
                      placeholder="Перечислите цветы и количество"
                      value={newBouquet.composition}
                      onChange={(e) => setNewBouquet({ ...newBouquet, composition: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="type2">Тип букета</Label>
                    <Input
                      id="type2"
                      placeholder="Например: Романтический"
                      value={newBouquet.type}
                      onChange={(e) => setNewBouquet({ ...newBouquet, type: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="image2">URL изображения</Label>
                    <Input
                      id="image2"
                      placeholder="https://example.com/image.jpg"
                      value={newBouquet.image}
                      onChange={(e) => setNewBouquet({ ...newBouquet, image: e.target.value })}
                    />
                  </div>
                  <Button onClick={handleAddBouquet} className="w-full gap-2">
                    <Icon name="Check" size={18} />
                    Добавить в галерею
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h3 className="text-4xl font-display font-bold text-center mb-12">
            Галерея букетов
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bouquets.map((bouquet) => (
              <Card key={bouquet.id} className="overflow-hidden hover:shadow-xl transition-shadow animate-scale-in group">
                {bouquet.image && (
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={bouquet.image}
                      alt={bouquet.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="font-display text-xl">{bouquet.title}</CardTitle>
                    {bouquet.type && (
                      <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {bouquet.type}
                      </span>
                    )}
                  </div>
                  <CardDescription>{bouquet.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Icon name="Flower" size={18} className="text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{bouquet.composition}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="types" className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-4xl font-display font-bold text-center mb-12">
            Виды композиций
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bouquetTypes.map((type) => (
              <Card key={type.name} className="text-center hover:shadow-lg transition-shadow animate-fade-in">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon name={type.icon as any} size={32} className="text-white" />
                  </div>
                  <CardTitle className="font-display">{type.name}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h3 className="text-4xl font-display font-bold text-center mb-12">
            Каталог цветов
          </h3>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4 font-display">Название</th>
                      <th className="text-left p-4 font-display">Цвета</th>
                      <th className="text-left p-4 font-display">Сезон</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flowerCatalog.map((flower, index) => (
                      <tr key={flower.name} className={index % 2 === 0 ? 'bg-white' : 'bg-muted/30'}>
                        <td className="p-4 font-medium">{flower.name}</td>
                        <td className="p-4 text-muted-foreground">{flower.color}</td>
                        <td className="p-4 text-muted-foreground">{flower.season}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contact" className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-display">Свяжитесь с нами</CardTitle>
              <CardDescription>
                Есть вопросы? Напишите нам!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-lg">
                <Icon name="Mail" size={20} className="text-primary" />
                <span>info@florabook.ru</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-lg">
                <Icon name="Phone" size={20} className="text-primary" />
                <span>+7 (999) 123-45-67</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-lg">
                <Icon name="MapPin" size={20} className="text-primary" />
                <span>Москва, ул. Цветочная, 15</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-foreground text-background py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="font-display text-xl mb-2">Florabook</p>
          <p className="text-sm opacity-80">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
