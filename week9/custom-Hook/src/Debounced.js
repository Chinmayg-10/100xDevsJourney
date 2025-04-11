let current;
function SearchBackend(){
    console.log("Backend request sent");
}
function DebouncedSearchBackend(){
    clearTimeout(current);
    current=setTimeout(SearchBackend,30); //start a clock
}
DebouncedSearchBackend();
DebouncedSearchBackend();
DebouncedSearchBackend();
DebouncedSearchBackend();

DebouncedSearchBackend();
DebouncedSearchBackend();
DebouncedSearchBackend();
DebouncedSearchBackend();
