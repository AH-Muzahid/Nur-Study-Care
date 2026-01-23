import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export default function MainLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 max-w-[96rem] mx-auto shadow-2xl">
            <Header />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
        </div>
    )
}
