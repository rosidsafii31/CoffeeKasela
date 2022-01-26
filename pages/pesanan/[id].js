import jQuery, { data } from 'jquery';
global.jQuery = jQuery;
global.$ = jQuery;
import { useEffect, } from "react";
import Link from 'next/link';
import {getData, getOngkirprov} from '../../utils/fetchData'
import { useContext,useState } from 'react'
import { DataContext } from '../../store/GlobalState'

export async function getServerSideProps({ params : {id}}) {
  const res = await getData(`order/${id}`)

  return {
    props: {
      order:res.order,
    }, // will be passed to the page component as props
  }
}
export default function Pesananan({order}) {
  const { state, dispatch } = useContext(DataContext)
  const { cart,users, } = state

  useEffect(() =>{
   var admin = $('#whatsapp .admin').val();
    $('#noAdmin').val(admin);// Nomor Tujuan
    $('.whatsapp-btn').on("click",function () {
    $('#whatsapp').toggleClass('toggle');});
    // Fungsi Tombol Whatsapp Kirim!
        $('#whatsapp .submit').on("click",WhatsApp);
        $("#whatsapp input, #whatsapp textarea").keypress(function () {
          if (event.which == 13) WhatsApp();
        });
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    // Fungsi Data Tulisan yang dikirim
    function WhatsApp() {
          var ph = '';
          if ($('#whatsapp .nama').val() == '') { // Cek Nama
            ph = $('#whatsapp .nama').attr('placeholder');
            alert('Silahkan tulis ' + ph);
            $('#whatsapp .nama').triggerHandler("focus");
            return false;
          } else if ($('#whatsapp .email').val() == '') { // Cek email
            ph = $('#whatsapp .email').attr('placeholder');
            alert('Silahkan tulis ' + ph);
            $('#whatsapp .email').triggerHandler("focus");
            return false;
          } else if ($('#whatsapp .nomor').val() == '') { // Cek nomor
            ph = $('#whatsapp .nomor').attr('placeholder');
            alert('Silahkan tulis ' + ph);
            $('#whatsapp .nomor').triggerHandler("focus");
            return false;
          } else if 
           ($('#whatsapp .kota').val() == '') { // Cek kota
            ph = $('#whatsapp .kota').attr('placeholder');
            alert('Silahkan tulis ' + ph);
            $('#whatsapp .kota').triggerHandler("focus");
            return false;
          } else if 
            ($('#whatsapp .licensi').val() == '') { // Cek licensi
            ph = $('#whatsapp .licensi').attr('placeholder');
            alert('Silahkan pilih ' + ph);
            $('#whatsapp .licensi').triggerHandler("focus");
            return false;
          } else if ($('#whatsapp .pembayaran').val() == '') { // Cek bayar
            ph = $('#whatsapp .pembayaran').attr('placeholder');
            alert('Silahkan pilih ' + ph);
            $('#whatsapp .pembayaran').triggerHandler("focus");
            return false;
          } else if ($('#whatsapp .informasi').val() == '') { // Cek dari
            ph = $('#whatsapp .informasi').attr('placeholder');
            alert('Silahkan pilih ' + ph);
            $('#whatsapp .informasi').triggerHandler("focus");
            return false;
          } else {
            // Check Device (Mobile/Desktop)
            var url_wa = 'https://web.whatsapp.com/send';
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
              url_wa = 'whatsapp://send/';
            }
            // Get Value
            var tujuan = $('#whatsapp .tujuan').val(),
              via_url = location.href,
              licensi =$('#whatsapp .licensi').val(),
              nama = $('#whatsapp .nama').val(),
              namaproduk = $('#whatsapp .detail').val(),
              totals = $('#whatsapp .total').val(),
              email = $('#whatsapp .email').val(),
              nomor = $('#whatsapp .nomor').val(),
              kota = $('#whatsapp .kota').val(),
              pembayaran = $('#whatsapp .pembayaran').val()
            $(this).attr('href', url_wa + '?phone=62 ' + tujuan + '&text=' +
                   ' Detail Pesananan :  ' + '%0A'+ '%0A'  + namaproduk +
                   '_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _%0A' + 
                   ' Total Bayar :  ' + 'Rp.'+ totals + '%0A'+
                   ' Bank Pembayaran :  ' + licensi + '%0A' +
                   '_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _%0A' +
                   ' Nama :  ' + nama + '%0A'+ 
                   ' Email :  ' + email + '%0A'+
                   ' Nomor WhatsApp :  ' + nomor + '%0A'+
                   ' Kota :  ' + kota + '%0A' +
                   '_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _%0A' +
                   ' Metode Pembayaran :  ' + pembayaran + '%0A' + 
                   ' Dari ' + via_url + '%0A' +'%0A' +
                   'Note : Setelah Melakukan pembayaran mohon untuk mengirim bukti pembayaran ke Whatsapp ini untuk proses pengiriman barang . Jika ada yang mau ditanyakan silahkan kirim pesan ke whatsapp ini');
            var w = 960,
              h = 540,
              left = Number((screen.width / 2) - (w / 2)),
              tops = Number((screen.height / 2) - (h / 2)),
              popupWindow = window.open(this.href, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + tops + ', left=' + left);
                    popupWindow.focus();
            return false;
          }
        }//]]>
  }, []);
  return (
    <div className="popup-wrapper bg-halaman-pesanan" id="buyWhatsApp">
      <div className="popup-container">
        <div className="container-contact100">
          <div className="wrap-contact100">
            <div className="title-beli mb-2 ">
              <span className="data-form-title ">
                <i className="fab fa-whatsapp" /> Pesan via <b>WhatsApp</b>
              </span>
              <div className="flex mr-2">
                <Link href={`/cart`}>
                <a>
                  <button className="px-3 mt-1  bg-gray-500 hover:bg-gray-300  text-white hover:text-black  tracking-wider  rounded">
                    Close
                  </button>
                </a>
                </Link>
              </div>
            </div>

            {/*=== HTML Form WhatsApp | @rian_seo ===*/}
            <div className="data-form validate-form" id="whatsapp">
              {/*=== HTML Pilihan Pembayaran ===*/}
              <input className="tujuan " id="noAdmin" type="hidden" />
              <input className="admin " id="noAdmin" value={users[0].nomorwa} type="hidden"/>
              <ul className="orderBank">
                {/*=== HTML Pilihan Produk ===*/}
                <section className=" tabs">
                  {/*=== HTML Pilihan (1) ===*/}
                  <label className=" mb-2 tab-label-1 font-bold" htmlFor="tab-1">
                    Detail Produk
                  </label>
                  {/*=== HTML Data Produk ===*/}
                  <div className="content">
                    {/*=== HTML Produk (1) ===*/}
                    <label>Multiple Select</label>
                    
                    <select  selected="selected" multiple class="detail form-control" id="sel2" name="sellist2">
                    {  
                    order.cart.map(item => (
                      <optgroup key={item._id}>
                          <option selected="selected" value={','+'Nama Produk : ' + item.title + '%0A'}>{item.title}</option>
                          <option selected="selected" value={'Berat : ' + item.berat + '%0A'}>{item.berat}</option>
                          <option selected="selected" value={'Harga : ' + item.harga + '%0A'}> {item.harga}</option>
                          <option selected="selected" value={'Jumlah : ' + item.jumlah+ '%0A'}>{item.jumlah}</option>
                          </optgroup>
                          ))
                        }
                          </select>
                    
                   <div>
                   <label htmlFor="exampleInputPassword1" className='font-bold mt-3 mb-2'>Total</label>
                    <input type="number" disabled className=" total form-control" id="total"
                    name="password" value={order.total} />
                  </div>
                   
                      
                  </div>
                </section>
              </ul>
              <label className="formWhatsApp">
                <i className="fa fa-angle-down" />
                <select className="licensi wajib  " placeholder="Pembayaran">
                  <option hidden="hidden" selected="selected" value={users[0].akunbank}>
                   {users[0].akunbank}
                  </option>
                  {/*=== HTML Data Pembayaran ===*/}
                  <optgroup label="Pilih Pembayaran">
                    <option value={users[0].akunbank}>
                    {users[0].akunbank}
                    </option>
                  </optgroup>
                </select>
              </label>
              {/*=== HTML Table Form Pesanan ===*/}
              <div className="gridWhatsApp">
                <label className="item">
                  {/*=== From Nama ===*/}
                  <i className="fa fa-user-circle" />
                  <input
                    className="nama wajib"
                    placeholder="Nama.."
                    type="text"
                  />
                </label>
                <label className="item">
                  {/*=== From Email ===*/}
                  <i className="fa fa-envelope" />
                  <input
                    className="email wajib"
                    placeholder="Email.."
                    type="text"
                  />
                </label>
              </div>
              <br />
              {/*=== HTML Table Form (2) ===*/}
              <div className="gridWhatsApp">
                <label className="item">
                  {/*=== From Nomor WhatsApp ===*/}
                  <i className="fab fa-whatsapp" />
                  <input
                    className="nomor wajib"
                    placeholder="WhatsApp.."
                    type="tel"
                    
                  />
                </label>
                <label className="item">
                  {/*=== From Nama Kota ===*/}
                  <i className="fa fa-university" />
                  <input
                    className="kota wajib"
                    placeholder="Alamat Lengkap.."
                    type="url"
                  />
                </label>
              </div>
              {/*=== HTML Opsi Form Produk ===*/}
              <label className="formWhatsApp">
                <i className="fa fa-angle-down" />
                <select className="pembayaran wajib" placeholder="Pembayaran">
                  <option hidden="hidden" selected="selected" value="default">
                    Metode Pembayaran
                  </option>
                  <optgroup label="Pilihan Produk">
                    <option value="Transfer">Transfer</option>
                  </optgroup>
                </select>
              </label>
              <label className="formWhatsApp">
                <i className="fa fa-angle-down" />
              </label>
              <div className="sendWhatsApp">
                <div className="sendWAcolor">
                  <div className="sendWAbuttom">
                    <a
                      className="sendWAclik submit"
                    >
                      Kirim
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}