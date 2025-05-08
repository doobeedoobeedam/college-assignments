public class BinarySearch {
    public static void main(String[] args) {
        int[] data = {20, 100, 300, 400, 500};
        int target = 2;
        int low = 0;
        int high = data.length - 1;
        boolean hasil = false;
        
        while (low <= high) {
            int mid = (low + high) / 2; 

            if (data[mid] == target) {
                hasil = true;
                break;
            } else if (data[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        
        if (hasil == true) {
            System.out.println("Ada angka " + target + " pada array tersebut.");
        } else {
            System.out.println("Tidak ada angka " + target + " pada array tersebut.");
        }
    }
}
