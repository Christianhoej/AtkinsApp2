
package com.atkinsapp2.communications.dataModels;

import com.google.gson.annotations.SerializedName;


@SuppressWarnings("unused")
public class DataModelCompartments {

    @SerializedName("data")
    private Data mData;

    @SerializedName("errors")
    private Errors mErrors;
    @SerializedName("headers")
    private Headers mHeaders;
    @SerializedName("statusCode")
    private Long mStatusCode;

    public Data getData() {
        return mData;
    }

    public void setData(Data data) {
        mData = data;
    }

    public Errors getErrors() {
        return mErrors;
    }

    public void setErrors(Errors errors) {
        mErrors = errors;
    }

    public Headers getHeaders() {
        return mHeaders;
    }

    public void setHeaders(Headers headers) {
        mHeaders = headers;
    }

    public Long getStatusCode() {
        return mStatusCode;
    }

    public void setStatusCode(Long statusCode) {
        mStatusCode = statusCode;
    }

}
