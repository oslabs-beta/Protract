import { useEffect } from 'react';

export default function LoginModal({modalOpen, setModalOpen}) {
    
    function closeModal(){
        // setModalOpen(false);
        document.querySelector("[data-modal]").close();
    }
    return (
        <dialog data-modal className="bg-slate-300 flex flex-col">
            <h1>Protract Login</h1>
            <form className="">
                <div>
                    <input className="" placeholder="Username"></input>
                </div>
                <div>
                    <input className="" placeholder="Password"></input>
                </div>
            </form>
            <button data-close-modal onClick={() => closeModal()}>Close Modal</button>
        </dialog>
    )
}