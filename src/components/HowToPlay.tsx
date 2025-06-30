


export default function HowToPlay() {
    return (
        <section id="howtoplay" className="min-h-screen minMaxWidth">
            <div className="flex flex-col gap-4 pt-16 pb-8 px-4">
                <h2 className="text-3xl font-bold items-center justify-center flex gap-2"><i className="fa-solid fa-block-question"></i> How to Play <i className="fa-solid fa-block-question"></i></h2>
                <p className="text-base mb-2">Ikuti langkah-langkah ini untuk bermain:</p>
                <ol className="list-decimal mb-2 marker:font-bold list-inside flex flex-col gap-y-4.5 text-base *:leading-[1.18] *:hover:text-hl-text/80 *:even:pl-5">
                    <li>Masuk / Buat sebuah <i>Room</i>.</li>
                    <li>Saat permainan dimulai, Anda akan memainkan sebuah karakter yang sudah diacak secara otomatis.</li>
                    <li>Setiap karakter memiliki peran masing-masing, lakukanlah tugas peranmu sebaik mungkin.</li>
                    <li>Pada hari pertama pemain tidak akan melakukan apapun selain chat hingga malam tiba.</li>
                    <li>Saat malam tiba, para <i>Werewolf</i> akan berburu <i>warga desa</i>.</li>
                    <li>Setiap hari para pemain yang memiliki kemampuan khusus akan dipersilahkan menggunakan kemampuan mereka.</li>
                    <li>Saat siang hari tiba, para pemain harus melakukan <i>voting</i> untuk memilih siapa yang akan dibunuh karena dianggap seorang <i>werewolf</i>.</li>
                    <li><i>Warga desa</i> akan menang jika berhasil mengeliminasi seluruh <i>werewolf</i> sampai tak tersisa.</li>
                    <li><i>Werewolf</i> akan menang jika berhasil mengeliminasi <i>warga desa</i> hingga tersisa kurang dari jumlah <i>werewolf</i>.</li>
                    {/*<li></li>*/}
                </ol>
                <span className="italic font-extralight text-xs text-yellow-200/60 text-justify">
                    <b>Catatan:</b> ini adalah permainan papan (<i>boardgame</i>) <b>klasik</b> yang diadaptasi ke dalam bentuk digital, jadi kemungkinan besar permainannya tidak akan sama persis dengan yang pernah Anda mainkan sebelumnya.
                </span>
            </div>
        </section>
    );
};