import Nav from "./nav"

export default function Layout({ children }) {
    return (
        <div className="h-full">
            <Nav />            
            <main className="flex justify-center items-center h-auto">{children}</main>
        </div>
    )
}