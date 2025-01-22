function Loader() {
  return (
    <div class="relative w-full h-full">
      <div class="absolute inset-0 flex justify-center items-center bg-opacity-50 white">
        <div class="border-4 border-t-4 border-gray-800 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
      </div>

      <div class="content"></div>
    </div>
  );
}
export default Loader;
