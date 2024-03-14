import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import colors from '../../constants/colors';

const STRIPE_PK =
  'pk_test_51HpdygAnsSDL7LeEKko1GIAhrQ14ZJs6PeNgAeOsLMfrJbnloRW3V3DNesd9ktS6QzshQwOnt3tHtWvy3hbusOUb00gNoOvFuh';
const STRIPE_PK_LIVE =
  'pk_test_51JzGFSIQ5jtZj5qxHaxY2wnpVnLQZ54GXkq4U0vIYyJuYApQzOugmA5VmkFSzbz7xxWiRs9WUlg8ZhLfi1LZyvYt00H7PioqkR';
const stripeRehanStripe =
  'pk_test_51IdudfCvAFj9FKm2BjB9BBL8Os9tP9oShx9SWEZKChOsVUJj2tmoW4suTr1FK8TcqV8g6vzeNo8BPAxC1PGy3Ip1003XooWJb9';
const PaymentView = props => {
  const {
    paymentPackage: {price, title, plan_duration},
  } = props;

  const onCheckStatus = response => {
    props.onCheckStatus(response);
  };

  const htmlContent = `
    
                <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Payment Page</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                <link rel="preconnect" href="https://fonts.gstatic.com">
                <script src="https://js.stripe.com/v3/"></script>

                <style>
                ::-webkit-input-placeholder { / Edge /
                color: black;
                }

                :-ms-input-placeholder { / Internet Explorer /
                color: black;
                }

                ::placeholder {
                color: black;
                }


                body{
                    background-color: ${colors.brown};
                }
                .membership-container{
                     display:flex;
                     flex-direction: column;
                    //  justify-content: center;
                     align-items: center;
                     margin-top:20px;
                     
                }
                .card{
                    background-color:${colors.brown};
                    border-radius: 20px !important;
                    margin-top:50px;
                }
                .card-holder{
                    display: flex;
                    flex-direction: column;
                    height: 170px;
                    justify-content: space-around;
                    background-color: ${colors.brown};
                    border-radius: 20px;
                    padding: 10px;
                    padding-top: 20px;
                    padding-bottom: 20px;
                    margin-top: 30px;
                    margin-bottom: 0px;
                    
                }
                .card-element{
                    color:black;
                    height: 100px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                }
                .card-name{
                    padding: 20;
                    color: '#FFF';
                    font-weight: 500;
                    font-size: '25px';
                    background-color: transparent;
                    border: none;
                    color:black;
                
                }

                input {
                    outline:none;
                    color: #FFF;
                    font-size: '25px';
                    font-weight: 500;
                    background-color: transparent;
                    }
                    

                    .row{
                        margin-top: '50px';
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                    }

                    .products-info{
                        width: 100%;
                        padding: 20px;
                        text-align: center;
                        text-transform: uppercase;
                    }

                    .card-errors{
                        color: red;
                    }
                    .pay-btn{
                        
                        display: flex;
                        height: 50px;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        margin: 0px;
                        margin-Top:50px;
                        
                        
                    }
                .custom-btn{
                    
                    background-color:green;
                    // border-width:1px;
                    // border-color:black;
                    // elivation:20px;
                    font-size: 17px;
                    font-weight: bold;
                    color:black !important;
                    box-shadow: none !important;
                    border-radius: 10px !important;
                    outline: none !important;
                   
                }
                // .custom-btn:focus, .custom-btn:active{
                //     color:#FFFFFF !important;
                // }

                </style>
            
            </head>
            <body>
                
                <!-- product info -->
                <div class="container-fluid">
                    <div class="row">
                        <div class="products-info">
                           <span style="font-size: 16px;font-weight: 500">Become A Member</span>
                        </div>
                    </div>
                     
                    
                    <div class="membership-container">
                    <div class="membership">
                          <span style="font-size: 17px;font-weight: bold">${title} Membership<span>
                        </div>
                        <div class="membership">
                          <span style="font-size: 16px;font-weight: bold">(price $${price}/${plan_duration})<span>
                        </div>
                        </div>
                    

                        <form>
                        <div class="card" >
                            <div class="card-holder">
                                    <input type="text"  placeholder="Card Holder Name" id="card-name" class="card-name" />

                                    <div id="card-element" class="card-element">

                                        // <div class="form-group">
                                        //     <label for="card_number">Carn Number</label>
                                        //     <input type="text" class="form-control" id="card_number" data-stripe="number">
                                        // </div>

                                        <div class="form-row">
                                            <label>
                                                <span >Card number</span>
                                                <input type="text" size="20" data-stripe="number">
                                            </label>
                                        </div> 
                                    
                                        <div class="form-row">
                                        <label>
                                            <span>Expiration (MM/YY)</span>
                                            <input type="text" size="2" data-stripe="exp_month">
                                        </label>
                                        <span> / </span>
                                        <input type="text" size="2" data-stripe="exp_year">
                                        </div>
                                    
                                        <div class="form-row">
                                        <label>
                                            <span>CVC</span>
                                            <input type="text" size="4" data-stripe="cvc">
                                        </label>
                                        </div>
                                    
                                        <div class="form-row">
                                        <label>
                                            <span>Billing Zip</span>
                                            <input type="hidden" size="6" data-stripe="address_zip" value="400012">
                                        </label>
                                        </div>
                                    
                                        
                                    </div>
                                    
                                </div>

                            </div>
                            <div class="row">
                        <label class="card-errors" id="card-errors"></label>
                    </div>
                                <div class="pay-btn">
                                    <input type="submit" class="btn btn-lg btn-block custom-btn" value="Pay Now" />
                                </div>
                
                        </form>


                <script>
                    var stripe = Stripe('${stripeRehanStripe}');

                    var elements = stripe.elements();
            
            
                        var card = elements.create("card", {
                            hidePostalCode: true,
                            style: {
                                base: {
                                color: 'black',
                                fontWeight: 500,
                                fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
                                fontSize: '20px',
                                fontSmoothing: 'antialiased',
                                '::placeholder': {
                                    color: 'black',
                                },
                                ':-webkit-autofill': {
                                    color: '#e39f48',
                                },
                            },
                            invalid: {
                                color: '#FC011F',
                                '::placeholder': {
                                    color: 'red',
                                },
                            },
                            }
                        });

                        // Add an instance of the card Element into the 'card-element' <div>.
                        card.mount('#card-element');


                        /**
                         * Error Handling
                         */

                        //show card error if entered Invalid Card Number
                        function showCardError(error){
                            document.getElementById('card-errors').innerHTML = ""
                            if(error){
                                document.getElementById('card-errors').innerHTML = error
                            } 
                        }
                        

                        card.on('change', function(event) {
                            if (event.complete) {
                                showCardError()
                                // enable payment button
                            } else if (event.error) {
                                const { message} = event.error
                                showCardError(message)
                            }
                        });

                        
                        card.mount('#card-element');

                        
                        /**
                         * Payment Request Element
                         */
                        

                        var form =  document.querySelector('form');

                        form.addEventListener('submit', function(e) {
                            e.preventDefault();

            
                            var additionalData = {
                                name: document.getElementById('card-name').value,
                                address_line1: undefined,
                                address_city:  undefined,
                                address_state: undefined,
                                address_zip: undefined,
                            };

            
                            stripe.createToken(card, additionalData).then(function(result) {

                            if (result.token) {
                                window.postMessage(JSON.stringify(result));
                            } else {
                                window.postMessage(JSON.stringify(result));
                            }
                        });

                        })

                </script>

            </body>
            </html>

    `;

  const injectedJavaScript = `(function() {
        window.postMessage = function(data){
            window.ReactNativeWebView.postMessage(data);
        };
    })()`;

  const onMessage = event => {
    const {data} = event.nativeEvent;
    onCheckStatus(data);
  };

  return (
    <WebView
      javaScriptEnabled={true}
      style={{flex: 1}}
      originWhitelist={['*']}
      source={{
        html: htmlContent,
        baseUrl: 'https://the-villagechildcare.com',
      }}
      injectedJavaScript={injectedJavaScript}
      onMessage={onMessage}
    />
  );
};

export default PaymentView;
