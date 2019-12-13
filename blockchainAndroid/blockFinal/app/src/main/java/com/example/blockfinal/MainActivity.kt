package com.example.blockfinal

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.drawerlayout.widget.DrawerLayout
import androidx.navigation.Navigation
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.NavigationUI
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.android.material.navigation.NavigationView
import org.web3j.crypto.Credentials
import org.web3j.protocol.Web3j.build
import org.web3j.protocol.infura.InfuraHttpService
import org.web3j.tx.gas.DefaultGasProvider
import java.math.BigInteger
import com.example.blockfinal.Sanphamnongnghiep
//import com.example.blockfinal.Caygiong
import com.example.blockfinal.ui.home.Main2Activity


class MainActivity : AppCompatActivity() {
    private val TAG = javaClass.name
    private var mAppBarConfiguration: AppBarConfiguration? = null
    private val tv1: TextView? = null
    private val row: Int = 0
    internal var btn1: Button? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val contractAddress = "0xf15d9fDD39E5B0FEd30ebe1F80Cf16E698aD7f3c"
        val url = "https://rinkeby.infura.io/v3/6e2f01b49b384897a521b1ecbba415cd"
        val credentials = Credentials.create("7BC69B4352AD2B141AE550E64BD2DD84E39D3DF602DFDBE772390618CB747A86")
        val contractGasProvider = DefaultGasProvider()
        val web3j = build(InfuraHttpService(url))
        val gasLimit: BigInteger = BigInteger.valueOf(20_000_000_000L)
        val gasPrice: BigInteger = BigInteger.valueOf(4300000)
        val toolbar = findViewById<Toolbar>(R.id.toolbar)
        setSupportActionBar(toolbar)
//        startActivity()
//        Intent(this@MainActivity, Main2Activity::class.java);
//        intent.putExtra("Username", "hello");
//        intent.putExtra("Password", "helloww");
////        val textss = HomeFragment().onActivityResult()
////        val convertstring ="dell"
//        val caygiong = Caygiong.load(contractAddress, web3j, credentials, contractGasProvider)
////        val txt = findViewById<TextView>(R.id.getdata)
//        val fab = findViewById<FloatingActionButton>(R.id.fab)
//        fab.setOnClickListener { view ->
//            val thread = Thread(Runnable {
//                try {
//
//                    // check contract validity
////                    Log.d(TAG, "failed: "+caygiong.isValid)
////                    Log.d(TAG, " ${greeter.isValid}")
////                    Log.d(TAG, "Success: "+caygiong.isCaygiong("0x9ef31cb54C0F87b3Cd54d18b156982c9fb32793d"))
//                    // read from contract
//                    // val counts = caygiong.caygiongCount
//                    //  Log.d(TAG, "counts:" +counts)
//
////                    if( textss.setText("Dell")= "Dell"){
////                        Log.d("Linh: ","linh")
////                    }
////                    else Log.d(TAG,"error")
////                    for(i in 0..(counts)) {
//                    val caygionging = caygiong.getCaygiong("0xAcC0d6917Fa419656D9F4163B38d5077a566fab6").sendAsync()
////                    val isCaygiong = caygionging.get()
//                    Log.d(TAG, "caygionging value returned: $caygionging")
//                    val convertToString = caygionging?.get()
//                    Log.d(TAG, " ${convertToString?.component1()}")
////                    }
////                    txt.setText("Data: "+convertToString?.component1())
//
//                    // write to contract
////                    val transactionReceipt: Future<TransactionReceipt>? = greeter.changeGreeting("Greeting changed from an Android App (ಠ_ಠ) ").sendAsync()
////                    val result = "Successful transaction. Gas used: ${transactionReceipt?.get()?.blockNumber}  ${transactionReceipt?.get()?.gasUsed}"
////                    Log.d(TAG, result)
////                    txt.setText("Successs: "+caygiong.isValid)
//                } catch (e: Exception) {
//                    e.printStackTrace()
//                    Log.d(TAG, "error accessing contract: " + e.message)
//                }
//            })
//
//            thread.start()

//        }

        val drawer = findViewById<DrawerLayout>(R.id.drawer_layout)
        val navigationView = findViewById<NavigationView>(R.id.nav_view)
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        mAppBarConfiguration = AppBarConfiguration.Builder(
                R.id.nav_home, R.id.nav_gallery, R.id.nav_slideshow,
                R.id.nav_tools, R.id.nav_share, R.id.nav_send)
                .setDrawerLayout(drawer)
                .build()
        val navController = Navigation.findNavController(this, R.id.nav_host_fragment)
        NavigationUI.setupActionBarWithNavController(this, navController, mAppBarConfiguration!!)
        NavigationUI.setupWithNavController(navigationView, navController)

    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
        menuInflater.inflate(R.menu.main, menu)
        return true
    }

    override fun onSupportNavigateUp(): Boolean {
        val navController = Navigation.findNavController(this, R.id.nav_host_fragment)
        return NavigationUI.navigateUp(navController, mAppBarConfiguration!!) || super.onSupportNavigateUp()
    }
}

