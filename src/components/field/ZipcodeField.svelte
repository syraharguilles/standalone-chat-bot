<script>
    import { onMount } from "svelte";
  
    const DEFAULT_THRESHOLD = 3;
  
    let AutoComplete;
    export let id = "autoComplete";
    export let matches = [];
    export let placeHolder = "";
    export let onSelection = () => {};
    export let src = {};
    export let threshold = DEFAULT_THRESHOLD;
    export let value = "";
  
    const getResultsListId = () => `${id}_list`;
  
    onMount(async () => {
      const module = await import("@tarekraafat/autocomplete.js");
      AutoComplete = module.default;
  
      new AutoComplete({
        data: {
          ...src,
          cache: false
        },
        trigger: {
          event: ["input"],
          condition: query => query.length >= threshold
        },
        placeHolder: placeHolder,
        selector: () => document.getElementById(id),
        threshold: threshold,
        debounce: 300,
        resultsList: {
          render: true,
          container: source => {
            source.setAttribute("id", getResultsListId());
            source.classList.add("autoComplete_list");
          },
          element: "ul",
          destination: document.getElementById(id),
          position: "afterend",
          navigation: (
            event,
            input,
            resListElement,
            onSelectionHandler,
            resListData
          ) => {
            resListElement.style.display =
              resListData.matches > 1 ? "block" : "none";
  
            if (resListData.matches === 1) {
              onSelectionHandler({ selection: { match: matches[0].label } });
            } else {
              resListElement.querySelectorAll("li").forEach(li => {
                li.addEventListener("click", () => {
                  onSelectionHandler({ selection: { match: li.innerText } });
                });
              });
            }
          }
        },
        maxResults: -1,
        highlight: true,
        resultItem: {
          content: (data, source) => {
            source.innerHTML = data.match;
          },
          element: "li"
        },
        onSelection: e => {
          document.getElementById(getResultsListId()).style.display = "none";
          value = e.selection.match;
          onSelection(e);
        }
      });
    });
  </script>
  
  <style>
    div {
      position: relative;
    }
    input[type="text"] {
      width: 100%;
    }
  </style>
  
  <svelte:head>
    <link rel="stylesheet" type="text/css" href="/autoComplete.css" />
  </svelte:head>
  
  <div>
    <input autocomplete="off" type="text" {id} bind:value />
  </div>
  