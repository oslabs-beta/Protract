
export default function LoginModal() {
    

    return (
        <dialog data-modal className="modal" id="loginModal">
            <h1>Protract Login</h1>
            <form className="">
                <div>
                    <input className="" placeholder="Username"></input>
                </div>
                <div>
                    <input className="" placeholder="Password"></input>
                </div>
            </form>
            <button data-close-modal onClick={() => (document.querySelector("#loginModal") as HTMLDialogElement).close()}>Close Modal</button>
        </dialog>
    )
}