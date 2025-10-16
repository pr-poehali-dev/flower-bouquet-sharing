import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import AuthDialog from '@/components/AuthDialog';

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

interface Bouquet {
  id: number;
  title: string;
  description: string;
  composition: string;
  type: string;
  image: string;
  likes: number;
  author?: string;
  comments?: Comment[];
}

interface User {
  id: string;
  name: string;
  email: string;
}

const Index = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [likedBouquets, setLikedBouquets] = useState<Set<number>>(new Set());
  const [selectedBouquet, setSelectedBouquet] = useState<Bouquet | null>(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('florabook_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const savedLikes = localStorage.getItem('florabook_likes');
    if (savedLikes) {
      setLikedBouquets(new Set(JSON.parse(savedLikes)));
    }
  }, []);
  const [bouquets, setBouquets] = useState<Bouquet[]>([
    {
      id: 1,
      title: 'Розовая нежность',
      description: 'Элегантная композиция из розовых роз с зеленью',
      composition: 'Розы розовые - 15 шт, Эвкалипт - 5 веток, Зелень декоративная',
      type: 'Романтический',
      image: 'https://cdn.poehali.dev/projects/01ee1f74-fb6a-42a7-af8c-1c8c8c921479/files/448580de-0d97-4539-a79a-6410cf6acde0.jpg',
      likes: 42,
      author: 'Флорист Елена',
      comments: []
    },
    {
      id: 2,
      title: 'Весенний микс',
      description: 'Яркая весенняя композиция с тюльпанами',
      composition: 'Тюльпаны - 10 шт, Ромашки - 7 шт, Хризантемы - 5 шт',
      type: 'Сезонный',
      image: 'https://cdn.poehali.dev/projects/01ee1f74-fb6a-42a7-af8c-1c8c8c921479/files/b53ecf5e-2cbb-40dc-94e0-2f03dfc341af.jpg',
      likes: 38,
      author: 'Студия цветов',
      comments: []
    },
    {
      id: 3,
      title: 'Свадебная классика',
      description: 'Роскошный свадебный букет в белых тонах',
      composition: 'Розы белые - 12 шт, Эвкалипт - 7 веток, Гипсофила, Лента атласная',
      type: 'Свадебный',
      image: 'https://cdn.poehali.dev/projects/01ee1f74-fb6a-42a7-af8c-1c8c8c921479/files/b381edf6-6889-469b-8251-8c69a10fdd57.jpg',
      likes: 67,
      author: 'Флорист Елена',
      comments: []
    },
    {
      id: 4,
      title: 'Пионовый рассвет',
      description: 'Нежные пионы в пастельных тонах',
      composition: 'Пионы розовые - 9 шт, Розы кустовые - 5 шт, Эустома - 3 шт, Зелень',
      type: 'Романтический',
      image: 'https://cdn.poehali.dev/projects/01ee1f74-fb6a-42a7-af8c-1c8c8c921479/files/b53ecf5e-2cbb-40dc-94e0-2f03dfc341af.jpg',
      likes: 51,
      author: 'Мария Петрова',
      comments: []
    },
    {
      id: 5,
      title: 'Осенний урожай',
      description: 'Яркая осенняя композиция с хризантемами',
      composition: 'Хризантемы желтые - 7 шт, Подсолнухи - 3 шт, Гортензия - 2 шт, Ягоды декоративные',
      type: 'Сезонный',
      image: 'https://cdn.poehali.dev/projects/01ee1f74-fb6a-42a7-af8c-1c8c8c921479/files/7aff3f99-e0b3-4847-a4a5-e14e775c68e1.jpg',
      likes: 58,
      author: 'Флорист Анна',
      comments: []
    },
    {
      id: 6,
      title: 'Деловой стиль',
      description: 'Строгая композиция для корпоративных мероприятий',
      composition: 'Розы белые - 10 шт, Эвкалипт - 7 веток, Антуриум - 3 шт',
      type: 'Корпоративный',
      image: 'https://cdn.poehali.dev/projects/01ee1f74-fb6a-42a7-af8c-1c8c8c921479/files/b381edf6-6889-469b-8251-8c69a10fdd57.jpg',
      likes: 45,
      author: 'Студия Флора',
      comments: []
    },
    {
      id: 7,
      title: 'Тропический рай',
      description: 'Экзотические цветы в ярких красках',
      composition: 'Орхидеи - 5 шт, Антуриум - 4 шт, Протея - 2 шт, Пальмовые листья',
      type: 'Корпоративный',
      image: 'https://cdn.poehali.dev/projects/01ee1f74-fb6a-42a7-af8c-1c8c8c921479/files/ce8116cf-0244-4dad-884f-296bcb729fba.jpg',
      likes: 72,
      author: 'Ольга Соколова',
      comments: []
    },
    {
      id: 8,
      title: 'Летняя полянка',
      description: 'Полевые цветы в естественной композиции',
      composition: 'Ромашки - 15 шт, Васильки - 10 шт, Колокольчики - 8 шт, Травы луговые',
      type: 'Сезонный',
      image: 'https://cdn.poehali.dev/projects/01ee1f74-fb6a-42a7-af8c-1c8c8c921479/files/7aff3f99-e0b3-4847-a4a5-e14e775c68e1.jpg',
      likes: 34,
      author: 'Цветочная мастерская',
      comments: []
    },
    {
      id: 9,
      title: 'Королевский бал',
      description: 'Роскошный свадебный букет с каскадной формой',
      composition: 'Розы белые - 20 шт, Орхидеи - 7 шт, Гортензия - 3 шт, Жемчужные нити',
      type: 'Свадебный',
      image: 'https://cdn.poehali.dev/projects/01ee1f74-fb6a-42a7-af8c-1c8c8c921479/files/b381edf6-6889-469b-8251-8c69a10fdd57.jpg',
      likes: 79,
      author: 'Флорист Виктория',
      comments: []
    },
    {
      id: 10,
      title: 'Признание в любви',
      description: 'Классический букет из красных роз',
      composition: 'Розы красные - 25 шт, Гипсофила, Зелень декоративная, Лента атласная красная',
      type: 'Романтический',
      image: 'https://cdn.poehali.dev/projects/01ee1f74-fb6a-42a7-af8c-1c8c8c921479/files/448580de-0d97-4539-a79a-6410cf6acde0.jpg',
      likes: 63,
      author: 'Студия Лепесток',
      comments: []
    },
    {
      id: 11,
      title: 'Лавандовые мечты',
      description: 'Ароматная композиция с лавандой',
      composition: 'Лаванда - 20 веток, Эустома сиреневая - 7 шт, Розы пудровые - 5 шт, Эвкалипт',
      type: 'Романтический',
      image: 'https://cdn.poehali.dev/projects/01ee1f74-fb6a-42a7-af8c-1c8c8c921479/files/acb0e61c-0abc-4505-9e36-61e2f74f1d2c.jpg',
      likes: 41,
      author: 'Наталья Иванова',
      comments: []
    },
    {
      id: 12,
      title: 'Зимняя сказка',
      description: 'Новогодняя композиция с хвоей',
      composition: 'Розы белые - 7 шт, Ветки ели - 5 шт, Хлопок - 10 шт, Шишки, Корица',
      type: 'Сезонный',
      image: 'https://cdn.poehali.dev/projects/01ee1f74-fb6a-42a7-af8c-1c8c8c921479/files/b381edf6-6889-469b-8251-8c69a10fdd57.jpg',
      likes: 52,
      author: 'Флорист Дарья',
      comments: []
    }
  ]);

  const [newBouquet, setNewBouquet] = useState({
    title: '',
    description: '',
    composition: '',
    type: '',
    image: ''
  });

  const [selectedFilter, setSelectedFilter] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredBouquets = bouquets
    .filter(b => selectedFilter === 'Все' || b.type === selectedFilter)
    .filter(b => {
      const query = searchQuery.toLowerCase();
      return b.title.toLowerCase().includes(query) || 
             b.composition.toLowerCase().includes(query) ||
             b.description.toLowerCase().includes(query);
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

  const handleLike = (bouquetId: number) => {
    if (!user) {
      toast({
        title: 'Войдите в аккаунт',
        description: 'Чтобы лайкать букеты, войдите или зарегистрируйтесь',
        variant: 'destructive'
      });
      setAuthOpen(true);
      return;
    }

    const newLiked = new Set(likedBouquets);
    if (newLiked.has(bouquetId)) {
      newLiked.delete(bouquetId);
      setBouquets(bouquets.map(b => 
        b.id === bouquetId ? { ...b, likes: b.likes - 1 } : b
      ));
    } else {
      newLiked.add(bouquetId);
      setBouquets(bouquets.map(b => 
        b.id === bouquetId ? { ...b, likes: b.likes + 1 } : b
      ));
    }
    setLikedBouquets(newLiked);
    localStorage.setItem('florabook_likes', JSON.stringify(Array.from(newLiked)));
  };

  const handleShare = async (bouquet: Bouquet) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: bouquet.title,
          text: bouquet.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Ссылка скопирована!',
        description: 'Поделитесь ей с друзьями'
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('florabook_user');
    setUser(null);
    toast({
      title: 'Вы вышли',
      description: 'До скорой встречи!'
    });
  };

  const handleAddComment = () => {
    if (!user) {
      toast({
        title: 'Войдите в аккаунт',
        description: 'Чтобы оставлять комментарии, войдите в аккаунт',
        variant: 'destructive'
      });
      setAuthOpen(true);
      return;
    }

    if (!commentText.trim() || !selectedBouquet) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: user.name,
      text: commentText,
      timestamp: new Date().toLocaleString('ru-RU', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    setBouquets(bouquets.map(b => 
      b.id === selectedBouquet.id 
        ? { ...b, comments: [...(b.comments || []), newComment] }
        : b
    ));

    const updatedBouquet = {
      ...selectedBouquet,
      comments: [...(selectedBouquet.comments || []), newComment]
    };
    setSelectedBouquet(updatedBouquet);
    setCommentText('');

    toast({
      title: 'Комментарий добавлен!',
      description: 'Ваш отзыв опубликован'
    });
  };

  const handleAddBouquet = () => {
    if (!user) {
      toast({
        title: 'Войдите в аккаунт',
        description: 'Чтобы добавлять букеты, войдите в аккаунт',
        variant: 'destructive'
      });
      setAuthOpen(true);
      return;
    }

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
      ...newBouquet,
      likes: 0,
      author: user.name
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
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    Привет, {user.name}!
                  </span>
                  <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                    <Icon name="LogOut" size={16} />
                    <span className="hidden sm:inline">Выйти</span>
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setAuthOpen(true)} className="gap-2">
                  <Icon name="User" size={16} />
                  <span className="hidden sm:inline">Войти</span>
                </Button>
              )}
              {user ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Icon name="Plus" size={18} />
                      <span className="hidden sm:inline">Добавить букет</span>
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
              ) : (
                <Button className="gap-2" onClick={() => setAuthOpen(true)}>
                  <Icon name="Plus" size={18} />
                  <span className="hidden sm:inline">Добавить букет</span>
                </Button>
              )}
            </div>
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
          <h3 className="text-4xl font-display font-bold text-center mb-8">
            Галерея букетов
          </h3>
          
          <div className="max-w-xl mx-auto mb-8 animate-fade-in">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по названию, составу или описанию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name="X" size={18} />
                </button>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in">
            <Button 
              variant={selectedFilter === 'Все' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('Все')}
              className="gap-2"
            >
              <Icon name="LayoutGrid" size={16} />
              Все
            </Button>
            {bouquetTypes.map((type) => (
              <Button
                key={type.name}
                variant={selectedFilter === type.name ? 'default' : 'outline'}
                onClick={() => setSelectedFilter(type.name)}
                className="gap-2"
              >
                <Icon name={type.icon as any} size={16} />
                {type.name}
              </Button>
            ))}
          </div>

          {filteredBouquets.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Flower" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">
                {searchQuery ? 'Ничего не найдено. Попробуйте изменить запрос' : 'Букеты этого типа пока не добавлены'}
              </p>
            </div>
          ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBouquets.map((bouquet) => (
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
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Icon name="Flower" size={18} className="text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{bouquet.composition}</p>
                    </div>
                    
                    <div className="border-t pt-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(bouquet.id)}
                            className="gap-1.5 h-9 px-3 hover:text-red-500 transition-colors"
                          >
                            <Icon 
                              name="Heart" 
                              size={18} 
                              className={likedBouquets.has(bouquet.id) ? 'fill-red-500 text-red-500' : ''}
                            />
                            <span className="text-sm font-medium">{bouquet.likes}</span>
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedBouquet(bouquet)}
                            className="gap-1.5 h-9 px-3"
                          >
                            <Icon name="MessageCircle" size={18} />
                            <span className="text-sm font-medium">{bouquet.comments?.length || 0}</span>
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleShare(bouquet)}
                            className="gap-1.5 h-9 px-3"
                          >
                            <Icon name="Share2" size={18} />
                          </Button>
                        </div>
                        
                        {bouquet.author && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Icon name="User" size={14} />
                            <span>{bouquet.author}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          )}
        </div>
      </section>

      <Dialog open={!!selectedBouquet} onOpenChange={() => setSelectedBouquet(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedBouquet && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">{selectedBouquet.title}</DialogTitle>
                <DialogDescription>{selectedBouquet.description}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                {selectedBouquet.image && (
                  <img 
                    src={selectedBouquet.image} 
                    alt={selectedBouquet.title}
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                )}
                
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="MessageCircle" size={20} />
                    Комментарии ({selectedBouquet.comments?.length || 0})
                  </h3>
                  
                  <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                    {selectedBouquet.comments && selectedBouquet.comments.length > 0 ? (
                      selectedBouquet.comments.map((comment) => (
                        <div key={comment.id} className="bg-muted/50 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm">{comment.text}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Пока нет комментариев. Будьте первым!
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Textarea
                      placeholder={user ? "Напишите комментарий..." : "Войдите, чтобы оставить комментарий"}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      disabled={!user}
                      rows={3}
                    />
                    <Button 
                      onClick={handleAddComment} 
                      disabled={!user || !commentText.trim()}
                      className="w-full"
                    >
                      <Icon name="Send" size={16} className="mr-2" />
                      Отправить комментарий
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

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

      <AuthDialog 
        open={authOpen} 
        onOpenChange={setAuthOpen}
        onAuth={(newUser) => setUser(newUser)}
      />
    </div>
  );
};

export default Index;