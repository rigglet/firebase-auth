import Nav from "./nav"

export default function Layout({ children }) {
    return (
        <div className="mx-14">
            <Nav/>
            <main className="flex justify-center">{children}</main>
        </div>
    )
}