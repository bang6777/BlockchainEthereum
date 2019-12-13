package com.example.blockfinal.ui.gallery;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;

import com.example.blockfinal.R;
import com.example.blockfinal.ui.home.Main2Activity;

public class GalleryFragment extends Fragment {

    private GalleryViewModel galleryViewModel;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        galleryViewModel =
                ViewModelProviders.of(this).get(GalleryViewModel.class);
        View root = inflater.inflate(R.layout.fragment_gallery, container, false);
        final TextView textss = root.findViewById(R.id.text_gallery);
        Intent intents = new Intent(getActivity(), Main2Activity.class);
//        Bundle bundle = new Bundle();
//        Bundle txtxt = intents.getBundleExtra("dulieu");

//        Log.d("Taa",""+txtxt);
         textss.setText(intents.getStringExtra("dulieu"));


        return root;
    }
}