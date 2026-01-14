import java.awt.*;
import java.awt.event.*;
import java.awt.image.BufferedImage;
import java.util.*;
import java.util.List;
import javax.swing.*;

public class RAMATTENDANCETRACKER {
    
    // List to store attendance records
    private static List<Attendance> attendanceList = new ArrayList<>();

    public static void main(String[] args) {
        // Create JFrame for the application
        JFrame frame = new JFrame("Attendance Tracker");
        frame.setSize(300, 400);  // Set window size
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLocationRelativeTo(null);  // Center the window
        
        // Create JPanel for the form layout (GridLayout for 5 rows and 2 columns)
        JPanel panel = new JPanel(new GridLayout(5, 2, 10, 10));
        
        // Create labels and text fields for user input
        JLabel nameLabel = new JLabel("Attendance Name:");
        JTextField nameField = new JTextField();
        
        JLabel courseLabel = new JLabel("Course/Year:");
        JTextField courseField = new JTextField();
        
        JLabel timeLabel = new JLabel("Time In:");
        JTextField timeField = new JTextField();
        
        JLabel signatureLabel = new JLabel("E-Signature:");
        
        // Create a custom panel for drawing the e-signature
        SignaturePanel signaturePanel = new SignaturePanel();
        
        // Add labels and fields to the panel
        panel.add(nameLabel);
        panel.add(nameField);
        panel.add(courseLabel);
        panel.add(courseField);
        panel.add(timeLabel);
        panel.add(timeField);
        panel.add(signatureLabel);
        
        // Add signature panel for drawing the signature
        panel.add(signaturePanel);
        
        // Add the panel to the frame
        frame.add(panel, BorderLayout.CENTER);
        
        // Create submit and exit buttons
        JButton submitButton = new JButton("Submit");
        JButton exitButton = new JButton("Exit");
        
        // Panel for the buttons
        JPanel buttonPanel = new JPanel();
        buttonPanel.add(submitButton);
        buttonPanel.add(exitButton);
        
        // Add the button panel to the frame
        frame.add(buttonPanel, BorderLayout.SOUTH);
        
        // Action listener for the Submit button
        submitButton.addActionListener(e -> {
            // Get user input
            String name = nameField.getText();
            String course = courseField.getText();
            String timeIn = timeField.getText();
            
            // Get the drawn signature as an image
            BufferedImage signatureImage = signaturePanel.getSignatureImage();
            
            // Create a new attendance record
            Attendance attendance = new Attendance(name, course, timeIn, signatureImage);
            
            // Add the attendance record to the list
            attendanceList.add(attendance);
            
            // Display confirmation message
            JOptionPane.showMessageDialog(frame, "Attendance Submitted:\n"
                    + "Name: " + name + "\n"
                    + "Course/Year: " + course + "\n"
                    + "Time In: " + timeIn);
            
            // Optionally, print all attendance records in the console
            System.out.println("Attendance List: ");
            for (Attendance a : attendanceList) {
                System.out.println(a);
            }
        });
        
        // Action listener for the Exit button
        exitButton.addActionListener(e -> {
            System.exit(0);  // Close the program
        });
        
        // Make the JFrame visible
        frame.setVisible(true);
    }

    // Class to store attendance data (name, course, time, and signature)
    static class Attendance {
        private String name;
        private String course;
        private String timeIn;
        private BufferedImage eSignature;

        public Attendance(String name, String course, String timeIn, BufferedImage eSignature) {
            this.name = name;
            this.course = course;
            this.timeIn = timeIn;
            this.eSignature = eSignature;
        }

        @Override
        public String toString() {
            return "Name: " + name + ", Course: " + course + ", Time In: " + timeIn;
        }
    }

    // Custom JPanel for drawing the e-signature
    static class SignaturePanel extends JPanel {
        private Image signatureImage;
        private Graphics2D g2d;
        private Point lastPoint;

        public SignaturePanel() {
            setPreferredSize(new Dimension(400, 300));  // Size of the signature area
            setBackground(Color.WHITE);  // Background color for drawing

            // Create an image buffer to draw on
            signatureImage = new BufferedImage(400, 100, BufferedImage.TYPE_INT_ARGB);
            g2d = (Graphics2D) signatureImage.getGraphics();
            g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            g2d.setColor(Color.BLACK);  // Drawing color
            g2d.setStroke(new BasicStroke(2));  // Line thickness

            // Mouse listener for detecting when the user presses and drags the mouse
            addMouseListener(new MouseAdapter() {
                @Override
                public void mousePressed(MouseEvent e) {
                    lastPoint = e.getPoint();  // Save the initial point of the signature
                }
            });

            // Mouse motion listener for tracking mouse movement (drawing the signature)
            addMouseMotionListener(new MouseAdapter() {
                @Override
                public void mouseDragged(MouseEvent e) {
                    Point currentPoint = e.getPoint();
                    g2d.drawLine(lastPoint.x, lastPoint.y, currentPoint.x, currentPoint.y);
                    lastPoint = currentPoint;
                    repaint();  // Repaint to show the updated signature
                }
            });
        }

        // Method to get the signature image
        public BufferedImage getSignatureImage() {
            return (BufferedImage) signatureImage;
        }

        // Paint method to render the drawn signature
        @Override
        protected void paintComponent(Graphics g) {
            super.paintComponent(g);
            g.drawImage(signatureImage, 0, 0, null);
        }
    }
}
