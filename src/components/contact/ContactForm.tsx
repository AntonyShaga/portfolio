import {useState} from "react";

export default function ContactForm () {

    const [form, setForm] = useState({name:'',email:'',message:''});
    return (
        <form action="">

            <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({...form, name:e.target.value})}
                placeholder="Ваше имя"
                required
            />

            <input
                type="email"
                value={form.email}
                onChange={(e) => setForm(({...form,email: e.target.value}))}
                placeholder="Ваш Email"
                required
            />
            <textarea
                value={form.message}
                onChange={(e) => setForm({...form, message:e.target.value})}
                placeholder={"Ваше сообщение"}
            ></textarea>
            <button type={"submit"}></button>
        </form>
    )
}
