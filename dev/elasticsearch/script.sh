
function insertElastic() {
	while true
	do
	  head_block_number=$(curl -s --data '{"jsonrpc":"2.0", "method":"get_dynamic_global_properties", "id":1}' https://api.blkcc.xyz | jq '.' | jq -rc '.result.head_block_number')
	  
	  local data="{\"jsonrpc\":\"2.0\", \"method\":\"call\", \"params\":[\"database_api\",\"get_block\",[$head_block_number]], \"id\":1}"
	  #curl -s --data "$data" https://api.blkcc.xyz | jq '.' | jq -rc '.result' >> result.log
	  result=$(curl -s --data "$data" https://api.blkcc.xyz | jq '.' | jq -rc '.result')
	  transactions=$(curl -s --data "$data" https://api.blkcc.xyz | jq '.' | jq -rc '.result.transactions')
	  #timestamp=$(curl -s --data "$data" https://api.blkcc.xyz | jq '.' | jq -rc '.result.timestamp')
	  #curl -s --data "$data" https://api.blkcc.xyz | jq '.' | jq -rc '.result.transactions' > transaction.json
	  
	  if [ "$transactions" == "[]" ]; then
		echo "Block does not have transactions"
	  else
		echo "Block has transactions"

		END=$(curl -s --data "$data" https://api.blkcc.xyz | jq '.' | jq -rc '.result.transactions' | jq length)
		((END--))
		echo $END
		for i in $(seq 0 $END)
		do
		
			local meta_data=".result.transactions[$i].operations[0][1].json_metadata"
			curl -s --data "$data" https://api.blkcc.xyz | jq '.' | jq -rc "$meta_data" > json_metadata.json
				
			app=$(grep -Po '"app": *\K"[^"]*"' json_metadata.json)
			
			if [[ "$app" == *"pulsar"* ]]; then
				
				local pdf_link_data=".result.transactions[$i].operations[0][1].body"
				local transaction_ids=".result.transaction_ids"
				
				pdf_link=$(curl -s --data "$data" https://api.blkcc.xyz | jq '.' | jq -rc "$pdf_link_data")
				transaction_ids_data=$(curl -s --data "$data" https://api.blkcc.xyz | jq '.' | jq -rc "$transaction_ids")
				
				jq ". += {\"link\" : \"$pdf_link\", \"head_block_number\" : \"$head_block_number\", \"transaction_ids\" : $transaction_ids_data}" json_metadata.json > mergedjson_metdata.json
					
				#Insert data into elasticsearch
				curl -XPOST http://localhost:9200/metadata/doc -d @mergedjson_metdata.json -H 'Content-Type: application/json'
			fi
		done
		
	  fi
	  
	  sleep 1
	done  
}

insertElastic

