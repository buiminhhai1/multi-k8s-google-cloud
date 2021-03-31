#!/bin/bash
# Our custom function
start_ms=$(ruby -e 'puts (Time.now.to_f * 1000).to_i')
# do some work
cust_func(){
  curl http://localhost:5000/values
  sleep 1
}
# For loop 20 times
for i in {1..20}
do
	cust_func $i & # Put a function in the background
done
 
## Put all cust_func in the background and bash 
## would wait until those are completed 
## before displaying all done message
wait 

end_ms=$(ruby -e 'puts (Time.now.to_f * 1000).to_i')
elapsed_ms=$((end_ms - start_ms))
echo "$elapsed_ms ms passed"
echo "All done"