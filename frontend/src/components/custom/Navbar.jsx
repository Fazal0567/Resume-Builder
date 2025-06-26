import { useUser } from "@/contexts/UserContext"
import { ModeToggle } from "@/components/mode-toggle"
import Login from "./Login"
import Register from "./Register"
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { toast } from "sonner"
import { Link } from "react-router-dom"
import { Menu } from "lucide-react"
import { Button } from "../ui/button"

const Navbar = () => {
  const { user, setUser } = useUser()

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/logout`, {
        credentials: 'include'
      })
      setUser(null)
      toast("Logout successful.")
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <header>
      <nav className="flex items-center container mx-auto border-b h-16 px-2 justify-between">
        <Link to="/" className="cursor-pointer">
          <img src="/logo.png" alt="logo" width={180} />
        </Link>

        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Sheet>
            <SheetTrigger>
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <div className="mt-4 flex flex-col gap-4 w-3/4 mx-auto">
                {user ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="https://cdn-icons-png.flaticon.com/512/219/219983.png" />
                        <AvatarFallback>{user.name}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <li className="list-none">
                      <Link to="/profile" className="w-full">
                    Profile
                    </Link>
                    </li>
                   <li className="list-none" onClick={handleLogout}>
                    Logout
                   </li>
                  </>
                ) : (
                  <div className="w-3/4 mx-auto flex flex-col gap-5">
                    <Login />
                    <Register />
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://cdn-icons-png.flaticon.com/512/219/219983.png" />
                  <AvatarFallback>{user.name}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Login />
              <Register />
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
