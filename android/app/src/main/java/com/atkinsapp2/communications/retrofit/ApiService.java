package com.atkinsapp2.communications.retrofit;

/*
 * Created by Zubair Akber on 22/07/2019
 * zubair.akber@outlook.com
 */

import com.atkinsapp2.communications.dataModels.DataModelCompartments;

import io.reactivex.Observable;
import retrofit2.http.*;

public interface ApiService {

    @Headers({
            "Accept: */*",
            "Accept-Encoding: gzip, deflate",
            "Authorization: Basic YXRraW5zQHN3aXBib3g6OTJmNmM1NDYtMjBiMy0xMWVhLWJjYWQtMzRlNmQ3MDIxNzg1",
            "Cache-Control: no-cache",
            "Connection: keep-alive",
            "Content-Type: application/json",
            "Host: test.infinity.swipbox.com",
            "Postman-Token: d29bf2d7-7725-4335-9c1b-dfe3b6db6834,801a7433-35ad-46c3-9ef7-dc9a74910cd7",
            "User-Agent: PostmanRuntime/7.20.1",
            "cache-control: no-cache",
            "x-api-key: de184407-20ac-11ea-bcad-34e6d7021785"
    })
    @GET("get_atkins_compartment_tokens")
    Observable<DataModelCompartments> getCompartments(@Query("uid") String uid);
}


/*public interface ApiService {

    @Headers({
            "Accept: *//*",
           "Accept-Encoding: gzip, deflate",
            "Connection: keep-alive",
            "Host: dev.infinity.swipbox.com",
            "Postman-Token: b39bd726-8643-4748-aeb4-62aeae814746,11e4a689-2108-438d-9bf1-412e057c4673",
            "User-Agent: PostmanRuntime/7.15.2",
            "cache-control: no-cache,no-cache",
            "x-auth-token: eyJraWQiOiJidm8yMDJGRjJTMTZSdmVveXRQWFFycGVLaWlCOFVtWjlGZVBqXC9LV05IRT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI3NDVjODQ5Ny1jNjNhLTQwYTctYTE2NS0wMzFkYzg2OGZiZmQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfVVdFanYxQ3dHIiwiY29nbml0bzp1c2VybmFtZSI6Ik1BWnRlc3QiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJNQVp0ZXN0IiwiYXVkIjoiMW83bGI2bXVocHJtMGNsaGE5bHF1aHE1MmciLCJldmVudF9pZCI6ImQyNDg5MWI2LTM5NzctNDYwNy1iZWRlLWJkOWVkNmUxMDE1MCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTYzNDMyNTQ1LCJuYW1lIjoidGVzdDEyIiwiZXhwIjoxNTYzNDM2MTQ1LCJpYXQiOjE1NjM0MzI1NDUsImZhbWlseV9uYW1lIjoibWFpbnRlbmFuY2VfcHJvdmlkZXJfMzMiLCJlbWFpbCI6InpvaGFpYmFicmFyNzNAZ21haWwuY29tIn0.ZYpjO033rkSnthNnCOaKur_NuUkmOnKXKPl7Naaef0XA79Aqr7DQasb9JtcxFqU_cQWkUfBaAqX4eGkfuZ0SmzBmOkG4-KYYRBOzB4XeE0LJqW9XQabwI2r1hXRbx5ng_5x3oLVFZcsGcHAwFDC3mMxEJ-RxKq-QxN0tVtAvY83G4MBibyBU75u28ZCbd0C5Obia7v_PtvDmS-5JvIvP9jtG-ed4p9oui2EAjrD30f6vM2FHf7VAoi-Afd8YR0iTTEx1GH0FFm9guPNmZDvSC0ZHFb6DUlM27_9B9YxCOv-GlIz5sausxJ2mwvrj93RHILL2RcAJVGb8MTrOxmtJSg"
    })
    @GET("compartments")
    Observable<DataModelCompartments> getCompartments(@Query("uid") String uid);
}
*/