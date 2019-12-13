package com.example.blockfinal.ui.home

import androidx.appcompat.app.AppCompatActivity

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.app.Dialog
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.ExpandableListAdapter
import android.widget.ExpandableListView
import android.widget.TextView
import android.widget.Toast
import com.example.blockfinal.*

import com.google.zxing.integration.android.IntentIntegrator
import kotlinx.android.synthetic.main.showproduct.*
import org.web3j.crypto.Credentials
import org.web3j.protocol.Web3j
import org.web3j.protocol.infura.InfuraHttpService
import org.web3j.tx.gas.DefaultGasProvider

import java.util.ArrayList
import java.util.HashMap

class Main2Activity : AppCompatActivity() {

    val GD_CAY_GIONG:String = "Giai Đoạn Cây Giống"
    val GD_CAY_ANTRAI:String = "Giai Đoạn Cây Ăn Trái"
    val GD_Thu_Mua:String = "Giai Đoạn Thu Mua"
    val GD_Phan_Phoi:String = "Giai Đoạn Phân Phối"
    val GD_Ban_Le:String = "Giai Đoạn Bán Lẻ"
    private var txtResult: TextView? = null
    private var ketqua: String? = null
    private val dialog: Dialog? = null

    private var idCaygiong: String? = null
    private var idCayantrai: String? = null
    private var idThumua: String? = null
    private var idPhanphoi: String? = null
    private var idBanle: String? = null
    private var textViewProduct:TextView? = null
    private val TAG = javaClass.name
    val sessionCayGiong:MutableList<String> = ArrayList()
    val sessionCayAnTrai:MutableList<String> = ArrayList()
    val sessionThuMua:MutableList<String> = ArrayList()
    val sessionPhanPhoi:MutableList<String> = ArrayList()
    val sessionBanLe:MutableList<String> = ArrayList()
    //Expandable
    val header:MutableList<String> = ArrayList()
    val body:MutableList<MutableList<String>> = ArrayList()
    var nameProduct:String? = null
    @SuppressLint("WrongViewCast")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.showproduct)
        val integrator = IntentIntegrator(this)
        textViewProduct = findViewById<TextView>(R.id.textViewProduct)
        integrator.initiateScan()
//        val textView = findViewById<TextView>(R.id.text_slideshow)
        title = "Show Product"


        header.add(GD_CAY_GIONG)
        header.add(GD_CAY_ANTRAI)
        header.add(GD_Thu_Mua)
        header.add(GD_Phan_Phoi)
        header.add(GD_Ban_Le)

        body.add(sessionCayGiong)

        body.add(sessionCayAnTrai)
        body.add(sessionThuMua)
        body.add(sessionPhanPhoi)
        body.add(sessionBanLe)

        expandableListView.setAdapter(ExpandableListAdapter(this,expandableListView,header,body))

    }

    public override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        val result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data)
        Log.d("LLLLLLLLLLLLL", "BBBBBBBBBBBBBBB " +result.contents)
        if (result != null) {
            if (result.contents == null) {
                Log.d("Lỗi", "lỗi")
            } else {
                ketqua = result.contents
//                txtResult!!.text = ketqua
                val contractAddressSanpham = "0x09d0e2BFf2cd905beD635551013DD16846650596"
                //URL Rinkeby
                val url = "https://rinkeby.infura.io/v3/6e2f01b49b384897a521b1ecbba415cd"
                //private key Metamask account
                val credentials = Credentials.create("7BC69B4352AD2B141AE550E64BD2DD84E39D3DF602DFDBE772390618CB747A86")
                val contractGasProvider = DefaultGasProvider()
                val web3j = Web3j.build(InfuraHttpService(url))
                //Load object from contract address
//                val caygiong = Caygiong.load(contractAddressCaygiong, web3j, credentials, contractGasProvider)
//                val cayantrai = Cayantrai.load(contractAddressCayantrai,web3j,credentials,contractGasProvider)
//                val thumua = Thumua.load(contractAddressThumua,web3j,credentials,contractGasProvider)
//                val phanphoi = Phanphoi.load(contractAddressPhanphoi,web3j,credentials,contractGasProvider)
//                val banle = Banle.load(contractAddressBanle,web3j,credentials,contractGasProvider)
                val sanpham = Sanphamnongnghiep.load(contractAddressSanpham, web3j, credentials,contractGasProvider)


                val thread = Thread(Runnable {
                    try {
//                        val caygionging = caygiong.getCaygiong(""+idCaygiong).sendAsync()
//                        val CaygiongconvertToString = caygionging?.get()
//                        val caygiongingD = caygiong.getCaygiongdetail(""+idCaygiong).sendAsync()
//                        val CaygiongDconvertToString = caygiongingD?.get()
                        val sanphaming = sanpham.getsanpham(""+ketqua).sendAsync()
                        val caygionging = sanpham.getCaygiong(""+ketqua).sendAsync()
                        val cayantraing = sanpham.getcayantrai(""+ketqua).sendAsync()
                        val thumuaing = sanpham.getthumua(""+ketqua).sendAsync()
                        val phanphoing = sanpham.getphanphoi(""+ketqua).sendAsync()
                        val banleing = sanpham.getbanle(""+ketqua).sendAsync()

                        val sanphamConvertToString = sanphaming?.get()
                        val caygiongConvertToString = caygionging?.get()
                        textViewProduct?.setText(sanphamConvertToString?.component2())

                        sessionCayGiong.add("Nơi sản xuất: ${caygiongConvertToString?.component2()}")
                        sessionCayGiong.add("Người trồng: ${caygiongConvertToString?.component3()}")
                        sessionCayGiong.add("Phân bón: ${caygiongConvertToString?.component4()}")
                        sessionCayGiong.add("Thời gian gieo xạ: ${caygiongConvertToString?.component5()}")
                        sessionCayGiong.add("Diện tích: ${caygiongConvertToString?.component6()}")
                        sessionCayGiong.add("Số lượng: ${caygiongConvertToString?.component7()}")

                        val CayantraiconvertToString = cayantraing?.get()
//                        sessionCayAnTrai.add("Id Cây Ăn Trái: ${CayantraiconvertToString?.component1()}")
                        sessionCayAnTrai.add("Nơi sản xuất: ${CayantraiconvertToString?.component2()}")
                        sessionCayAnTrai.add("Người trồng: ${CayantraiconvertToString?.component3()}")
                        sessionCayAnTrai.add("Phân bón: ${CayantraiconvertToString?.component4()}")
                        sessionCayAnTrai.add("Thời vụ: ${CayantraiconvertToString?.component5()}")
                        sessionCayAnTrai.add("Số lượng: ${CayantraiconvertToString?.component6()}")


                        val ThumuaconvertToString = thumuaing?.get()
                        sessionThuMua.add("Tên người thu mua: ${ThumuaconvertToString?.component2()}")
                        sessionThuMua.add("Nơi thu mua: ${ThumuaconvertToString?.component3()}")
                        sessionThuMua.add("Cách thức thu mua: ${ThumuaconvertToString?.component4()}")

                        val PhanphoiconvertToString = phanphoing?.get()
                        sessionPhanPhoi.add("Cơ sở phân phối: ${PhanphoiconvertToString?.component2()}")
                        sessionPhanPhoi.add("Địa điểm nơi phân phối: ${PhanphoiconvertToString?.component3()}")
                        sessionPhanPhoi.add("Cách thức phân phối: ${PhanphoiconvertToString?.component4()}")
                        sessionPhanPhoi.add("Đóng gói: ${PhanphoiconvertToString?.component5()}")
                        sessionPhanPhoi.add("Bảo quản: ${PhanphoiconvertToString?.component6()}")

                        val BanleconvertToString = banleing?.get()
                        sessionBanLe.add("Cơ sở bán lẻ: ${BanleconvertToString?.component2()}")
                        sessionBanLe.add("Nơi bán lẻ: ${BanleconvertToString?.component3()}")
                        sessionBanLe.add("Cách thức bán lẻ: ${BanleconvertToString?.component4()}")
                        sessionBanLe.add("Đóng gói: ${BanleconvertToString?.component5()}")


                    } catch (e: Exception) {
                        e.printStackTrace()
                        Log.d(TAG, "error accessing contract: " + e.message)
                    }
                })

                thread.start()
                if(ketqua != null) {

                    if (idCaygiong == null && idCayantrai == null && idThumua == null && idPhanphoi == null && idBanle == null) {
                        //   showAlertDialog();

                    }
                }
            }

        } else {
            Log.d("aaaaaaaaaaaa" , "sssssss")
            super.onActivityResult(requestCode, resultCode, data)
        }
    }

    fun showAlertDialog() {
        val builder = AlertDialog.Builder(this)
        builder.setTitle("Scan Ảnh")
        builder.setMessage("Bạn hãy scan lại nhé!!!!")
        builder.setCancelable(false)
        builder.setPositiveButton("Scan") { dialogInterface, i ->
            val integrator = IntentIntegrator(this@Main2Activity)
            integrator.initiateScan()
        }
        builder.setNegativeButton("Cancel") { dialogInterface, i ->
            //                dialogInterface.dismiss();
            val intent = Intent(this@Main2Activity, MainActivity::class.java)
            startActivity(intent)
        }
        val alertDialog = builder.create()
        alertDialog.show()

    }


}
