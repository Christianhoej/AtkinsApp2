package com.atkinsapp2.communications;


/*
 * Created by Zubair Akber on 22/07/2019
 * zubair.akber@outlook.com
 */

import com.atkinsapp2.communications.dataModels.DataModelCompartments;

public interface CompartmentInterface {

    void onDataAvailable(DataModelCompartments dataModelCompartments);

    void onError();
}
