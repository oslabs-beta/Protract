
export default function SignUpModal() {
    

    return (
        <dialog data-modal className="modal" id="signUpModal">
            <h1>Protract Sign Up</h1>
            <form className="">
                <div>
                    <input className="" placeholder="Username"></input>
                </div>
                <div>
                    <input className="" placeholder="Email"></input>
                </div>
                <div>
                    <input className="" placeholder="Password"></input>
                </div>
            </form>
            <button data-close-modal onClick={() => (document.querySelector("#signUpModal")as HTMLDialogElement).close()}>Close Modal</button>
        </dialog>
    )
}