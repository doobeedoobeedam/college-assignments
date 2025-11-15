public class SequentialSearch {
    public static void main(String[] args) {
        int[] data = {4, 3, 1, 2, 0};
        int target = 20;
        boolean hasil = false;
        
        for (int i = 0; i < data.length; i++) {
            if (data[i] == target) {
                hasil = true;
                break;
            }
        }
        
        if (hasil == true) {
            System.out.println("Ada angka " + target + " pada array tersebut.");
        } else {
            System.out.println("Tidak ada angka " + target + " pada array tersebut.");
        }
    }
}
