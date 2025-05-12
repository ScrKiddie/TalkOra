import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useTheme } from "@/components/theme-provider.tsx";
import Logo from "@/components/logo.tsx";

const Login = () => {
    const { theme } = useTheme();

    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <div className="relative rounded-xl">
                <Card className="w-[350px] mx-auto z-20">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <div className="flex items-center gap-1">
                                <Logo mode={theme} />
                                <p className="text-4xl">TalkOra</p>
                            </div>
                        </CardTitle>
                        <CardDescription>Silahkan login untuk melanjutkan.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" />
                                </div>
                                <Button className="w-full">Login</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Login;
