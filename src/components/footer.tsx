export default function Footer() {
    return (
        <footer className="w-full fixed bottom-0 left-0 right-0">
            <div className="container mx-auto p-2 flex flex-center justify-center items-center h-16">
                <p>&copy; {new Date().getFullYear()} Zurich Insurance Group Ltd. All rights reserved.</p>
            </div>
        </footer>
    )
}