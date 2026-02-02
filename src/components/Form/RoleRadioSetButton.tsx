
export default function RoleRadioSetButton() {
    return <span
        className={ `minMaxWidth ring ring-hl-text/5 hover:ring-hl-text/25 flex items-center justify-around gap-2 bg-hl-secondary min-h-10 h-fit py-2 px-2 rounded-md` }>
        <div className="relative group">
            <input type="radio" id="roleDefault" name="roleSet" value="default"
                className="peer absolute opacity-0 w-full h-full cursor-pointer"
                defaultChecked />
            <label htmlFor="roleDefault"
                className="block peer-checked:group-hover:scale-102 select-none group-hover:scale-102  peer-checked:bg-hl-text2 font-bold peer-checked:text-hl-secondary border-2 bg-transparent text-hl-text2 border-hl-text2 peer-checked:border-hl-text/70 py-1.5 px-3.5 rounded-md cursor-pointer ">Default</label>
        </div>
        <div className="relative group">
            <input type="radio" id="roleCustom" name="roleSet" value="custom"
                className="peer absolute opacity-0 w-full h-full cursor-pointer" />
            <label htmlFor="roleCustom"
                className="block group-hover:scale-102 select-none peer-checked:group-hover:scale-102  peer-checked:bg-hl-text2 font-bold peer-checked:text-hl-secondary border-2 bg-transparent text-hl-text2 border-hl-text2 peer-checked:border-hl-text/70 py-1.5 px-3.5 rounded-md cursor-pointer ">Custom</label>
        </div>
    </span>;
}

