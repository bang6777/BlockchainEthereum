package com.example.blockfinal.ui.home;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;

import com.example.blockfinal.R;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

public class HomeFragment extends Fragment {
    private String txt;
    private TextView txtResult;
    private ImageButton btnSearch;
    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        View root = inflater.inflate(R.layout.fragment_home, container, false);
        final TextView textView = root.findViewById(R.id.text_home);
        final Activity activity = getActivity();
        btnSearch = root.findViewById(R.id.tracuu);
//        txtResult = root.findViewById(R.id.xem);
        final IntentIntegrator integrator = new IntentIntegrator(getActivity());
        btnSearch.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Log.d("gia tri", " "+txt);
                Intent intent = new Intent(getActivity(), Main2Activity.class);
                startActivity(intent);
            }
        });


        return root;
    }

}