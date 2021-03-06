<!DOCTYPE HTML>
<html>
	<head>
	<script>
		(function(){
			var $lastClicked;

			function onTarefaDeleteClick() {

				$(this).parent('.tarefa-item')
					.unbind('click')
					.hide('slow', function() {
					$(this).remove();
			});
			}
			 function addTarefa(text) {
				var $tarefa = $("<div />")
                  .addClass("tarefa-item")
                  .append($("<div />")
                          .addClass("tarefa-text")
                          .text(text))
                  .append($("<div />")
                          .addClass("tarefa-delete"))
                  .append($("<div />")
                          .addClass("clear"));

				$("#tarefa-list").append($tarefa);

				$(".tarefa-delete").click(onTarefaDeleteClick);

				$(".tarefa-item").click(onTarefaItemClick);
			}
		function onTarefaKeydown(event) {
			if(event.which === 13) {
				addTarefa($("#tarefa").val());
				$("#tarefa").val("");
			}
		}

		function onTarefaEditKeydown(event) {
			if(event.which === 13) {
				savePendingEdition($lastClicked);
				$lastClicked = undefined;
			}
		}

		function onTarefaItemClick(){
			if(!$(this).is($lastClicked)) {
				if($lastClicked !== undefined) {
					savePendingEdition($lastClicked);
				}

				$lastClicked = $(this);

				var text = $lastClicked.children('.tarefa-text').text();

				var content = "<input type='text' class='tarefa-edit' value='" + 
					text + "'>";

				$lastClicked.html(content);

				$(".tarefa-edit").keydown(onTarefaEditKeydown);
			}
  
		}

		function savePendingEdition($tarefa) {
			var text = $tarefa.children('.tarefa-edit').val();
			$tarefa.empty();
			$tarefa.append("<div class='tarefa-text'>" + text + "</div>")
					.append("<div class='tarefa-delete'></div>")
					.append("<div class='clear'></div>");

			$(".tarefa-delete").click(onTarefaDeleteClick);

			$tarefa.click(onTarefaItemClick);
		}

		$(".tarefa-delete").click(onTarefaDeleteClick);

		$(".tarefa-item").click(onTarefaItemClick);

		$("#tarefa").keydown(onTarefaKeydown);
		});
	</script>
	</head>
	<body>
		 <div class="todo">
            <h2>TODO List</h2>
            <input type="text" id="tarefa" placeholder="Digite aqui a sua tarefa e pressione ENTER">
            <div id="tarefa-list">
                <div class="tarefa-item">
                    <div class="tarefa-text">Comprar pão</div>
                    <div class="tarefa-delete"></div>
                    <div class="clear"></div>
                </div>
                <div class="tarefa-item">
                    <div class="tarefa-text">Pagar a conta de luz</div>
                    <div class="tarefa-delete"></div>
                    <div class="clear"></div>
                </div>
            </div>
        </div>

	</body>
	
</html>