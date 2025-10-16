import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuth: (user: { id: string; name: string; email: string }) => void;
}

const AuthDialog = ({ open, onOpenChange, onAuth }: AuthDialogProps) => {
  const { toast } = useToast();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    const user = {
      id: Date.now().toString(),
      name: loginEmail.split('@')[0],
      email: loginEmail
    };

    localStorage.setItem('florabook_user', JSON.stringify(user));
    onAuth(user);
    onOpenChange(false);

    toast({
      title: 'Добро пожаловать!',
      description: 'Вы успешно вошли в аккаунт'
    });
  };

  const handleRegister = () => {
    if (!registerName || !registerEmail || !registerPassword) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    const user = {
      id: Date.now().toString(),
      name: registerName,
      email: registerEmail
    };

    localStorage.setItem('florabook_user', JSON.stringify(user));
    onAuth(user);
    onOpenChange(false);

    toast({
      title: 'Регистрация успешна!',
      description: `Добро пожаловать, ${registerName}!`
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Вход в Florabook</DialogTitle>
          <DialogDescription>
            Войдите или создайте новый аккаунт
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <div>
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="login-password">Пароль</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Button onClick={handleLogin} className="w-full gap-2">
              <Icon name="LogIn" size={18} />
              Войти
            </Button>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <div>
              <Label htmlFor="register-name">Имя</Label>
              <Input
                id="register-name"
                placeholder="Ваше имя"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="register-email">Email</Label>
              <Input
                id="register-email"
                type="email"
                placeholder="you@example.com"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="register-password">Пароль</Label>
              <Input
                id="register-password"
                type="password"
                placeholder="••••••••"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <Button onClick={handleRegister} className="w-full gap-2">
              <Icon name="UserPlus" size={18} />
              Зарегистрироваться
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
