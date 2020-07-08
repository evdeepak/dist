function razerPay() {};
    razerPay.prototype.pay = function pay(that) {
        var options = {
            "key": that.razorpayPayIntitalData['key'], // Enter the Key ID generated from the Dashboard
            // "amount": "29935", // Amount is in currency subunits. Default currency is INR. Hence, 29935 refers to 29935 paise or INR 299.35.
            "currency": that.razorpayPayIntitalData['currency'],
            "name": that.razorpayPayIntitalData['company_name'],
            "description": that.razorpayPayIntitalData['company_description'],
            "image": that.razorpayPayIntitalData['company_image_logo'],
            "order_id": that.razorpayPayIntitalData['order_id'], //This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
            "handler": function (razorpay_payment_response) {
                console.log("razer pay handler ", razorpay_payment_response);

                $.ajax({
                    url: that.razorpayPayIntitalData['api'],
                    type: "post",
                    // data: {
                        
                    //     "razorpay_order_id": razorpay_payment_response.razorpay_order_id,
                    //     "razorpay_payment_id": razorpay_payment_response.razorpay_payment_id,
                    // },
                    data:razorpay_payment_response,
                    headers: {
                        "Authorization": "token"+localStorage.getItem('token')
                        },
                   cache: false,
                    success: function (ajax_response) {
                        console.log("razor pay handler ajax res = ", ajax_response);
                        that.toastr.successToastr(ajax_response.message, 'Success!', { dismiss: 'auto'});                        if(ajax_response.status == 'sucesss')
                          {
                            http://localhost:4200/summery;id=630
                             console.log('$location',loc);
                            //   document.location = (['/summery', { id: ajax_response.appointment_id }])
                          that.router.navigate(['/summery', { id: ajax_response.appointment_id }]);
                           console.log("ajax_response.appointment_id = ", ajax_response.appointment_id);
                       // this.router.navigate(['/summery',],{ queryParams: {appoinementID: ajax_response.appointment_id} });
                          }
                          else {
                            that.toastr.errorToastr(ajax_response.message ,'Failure!', { dismiss: 'auto'})
                          }
                         
                        that.paymentSuccessObj = {
                            'razorpay_order_id': ajax_response.order_id,
                            'razorpay_payment_id': ajax_response.razorpay_payment_id,
                            'payment_status': ajax_response.status
                        };
                    }
                });
            },
            "prefill": {
                "name": that.razorpayPayIntitalData['user_name'],
                "email": that.razorpayPayIntitalData['user_email']
            },
            "notes": {
                "address": that.razorpayPayIntitalData['user_address']
            },
            "theme": {
                "color": "#528FF0"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    };

var razerPaymodule = new razerPay();

