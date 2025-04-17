import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useTheme } from "@/components/theme-provider.tsx";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils.ts";
import Logo from "@/components/logo.tsx";

const GridBackgrounds = () => {
    const patterns = [
        "[mask-image:radial-gradient(500px_circle_at_left,white,transparent)] lg:block hidden",
        "[mask-image:radial-gradient(250px_circle_at_top,white,transparent)] lg:hidden block",
        "[mask-image:radial-gradient(250px_circle_at_bottom,white,transparent)] lg:hidden block",
        "[mask-image:radial-gradient(500px_circle_at_right,white,transparent)] lg:block hidden"
    ];

    return (
        <>
            {patterns.map((pattern, index) => (
                <AnimatedGridPattern
                    key={index}
                    numSquares={30}
                    maxOpacity={0.1}
                    duration={3}
                    repeatDelay={1}
                    className={cn(pattern)}
                />
            ))}
        </>
    );
};

const Login = () => {
    const { theme } = useTheme();

    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <GridBackgrounds />
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
