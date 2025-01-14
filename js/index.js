document.addEventListener("DOMContentLoaded", () => {
  // Program Menu
  const menuToggle = document.getElementById("menu-toggle");
  const overlay = document.getElementById("overlay");
  const mobileMenu = document.getElementById("mobile-menu");

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableScroll = () => {
    document.body.style.overflow = "";
  };

  if (menuToggle && mobileMenu && overlay) {
    const closeMenu = () => {
      mobileMenu.classList.remove("show");
      mobileMenu.classList.add("hide");
      overlay.classList.remove("show");
      menuToggle.innerHTML = `<img src="images/icon-hamburger.svg" alt="Menu" class="h-6 w-6">`;

      mobileMenu.addEventListener(
        "animationend",
        () => {
          if (!mobileMenu.classList.contains("show")) {
            mobileMenu.style.display = "none";
            mobileMenu.classList.remove("hide");
            enableScroll();
          }
        },
        { once: true }
      );
    };

    const openMenu = () => {
      mobileMenu.style.display = "flex";
      mobileMenu.classList.remove("hide");
      mobileMenu.classList.add("show");
      overlay.classList.add("show");
      menuToggle.innerHTML = `<img src="images/icon-close-menu.svg" alt="Close" class="h-6 w-6">`;
      disableScroll();
    };

    menuToggle.addEventListener("click", () => {
      if (mobileMenu.classList.contains("show")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlay.addEventListener("click", closeMenu);
  }

  // program modal
  const modal = document.getElementById("modal");
  const modalContent = document.querySelector(".modal-content");
  const openModalBtn = document.getElementById("back-project");
  const closeModalBtn = document.getElementById("close-modal");

  // Fungsi untuk membuka modal
  function openModal() {
    modal.classList.remove("hidden", "closing");
    modal.classList.add("active");
    modalContent.classList.remove("closing");
    modalContent.classList.add("active");
    modal.style.display = "flex";
    disableScroll();

    // Sembunyikan semua elemen .target-content saat modal dibuka
    document.querySelectorAll(".target-content").forEach((element) => {
      element.classList.add("hidden");
      element.classList.remove("active");
    });
  }

  // Fungsi untuk menutup modal
  function closeModal() {
    modal.classList.remove("active");
    modal.classList.add("closing");
    modalContent.classList.remove("active");
    modalContent.classList.add("closing");

    document.querySelectorAll(".target-content").forEach((element) => {
      element.classList.add("hidden");
    });

    // Reset semua pesan error dan input yang ada
    document.querySelectorAll(".error-message").forEach((msg) => {
      msg.textContent = ""; // Hapus pesan error
      msg.classList.add("hidden"); // Sembunyikan pesan error
    });

    document.querySelectorAll(".pledge-input").forEach((input) => {
      input.classList.remove("shake", "input-error"); // Hapus animasi dan border merah
      input.value = ""; // Kosongkan input
    });

    // Reset semua radio buttons
    const radioButtons = document.querySelectorAll(
      'input[type="radio"][name="pledge"]'
    );
    radioButtons.forEach((radio) => {
      radio.checked = false;
      const targetDiv = radio.closest(".border");
      if (targetDiv) {
        targetDiv.classList.remove("selected");
      }
    });

    // Sembunyikan modal setelah animasi selesai
    setTimeout(() => {
      modal.classList.add("hidden");
      modal.style.display = "none";
      enableScroll();
    }, 300);
  }

  // Event untuk membuka modal melalui tombol "Back this project"
  if (openModalBtn) {
    openModalBtn.addEventListener("click", openModal);
  }

  // Event untuk menutup modal
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  // program button bookmark
  const bookmarkBtn = document.getElementById("bookmark-btn");
  const bookmarkIconContainer = document.getElementById("bookmark-icon-container");
  const bookmarkText = document.getElementById("bookmark-text");
  
  bookmarkBtn.addEventListener("click", () => {
    // Periksa apakah tombol sudah di-bookmark
    const isBookmarked = bookmarkText.textContent.trim() === "Bookmarked";
  
    if (isBookmarked) {
      // Jika sudah di-bookmark, kembalikan ke status awal
      bookmarkText.textContent = "Bookmark";
      bookmarkText.classList.remove("text-Dark-cyan");
      bookmarkIconContainer.classList.remove("bg-Dark-cyan");
    } else {
      // Jika belum di-bookmark, ubah teks dan warna
      bookmarkText.textContent = "Bookmarked";
      bookmarkText.classList.add("text-Dark-cyan");
      bookmarkIconContainer.classList.add("bg-Dark-cyan");
    }
  });

  const radioButtons = document.querySelectorAll('input[type="radio"][name="pledge"]');
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      // Hilangkan kelas 'selected' dari semua elemen border
      document.querySelectorAll(".border").forEach((element) => {
        element.classList.remove("selected");
      });

      // Tambahkan kelas 'selected' ke elemen yang terkait dengan radio button yang dipilih
      const targetDiv = radio.closest(".border");
      if (targetDiv) {
        targetDiv.classList.add("selected");
      }

      // Sembunyikan semua elemen target-content
      document.querySelectorAll(".target-content").forEach((element) => {
        element.classList.remove("active");
        element.classList.add("hidden"); // Pastikan semuanya tersembunyi sebelum dimunculkan
      });

      // Dapatkan target berdasarkan data-target radio button yang dipilih
      const target = document.querySelector(radio.getAttribute("data-target"));

      // Pastikan target ada dan tambahkan kelas 'active' untuk menampilkannya
      if (target) {
        target.classList.remove("hidden");
        setTimeout(() => { // Delay sedikit untuk memulai animasi setelah elemen tersedia
          target.classList.add("active");
        }, 10);
      }
      target.scrollIntoView({
        behavior: "smooth", // Smooth scroll
        block: "center", // Pastikan target di posisi tengah
      });
    });
  });

  // Seleksi semua tombol "Select Reward"
  const selectRewardButtons = document.querySelectorAll(".select-reward");
  // Event untuk membuka modal dan memilih reward
  selectRewardButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const rewardId = button.getAttribute("data-reward");
      const rewardInput = document.getElementById(`reward-${rewardId}`);

      // Buka modal
      openModal();

      // Menambahkan delay sebelum memilih reward otomatis agar modal dan konten target muncul terlebih dahulu
      setTimeout(() => {
        // Pilih reward otomatis
        if (rewardInput) {
          rewardInput.checked = true;
          const targetDiv = rewardInput.closest(".border");
          if (targetDiv) {
            targetDiv.classList.add("selected"); // Tandai reward sebagai terpilih
          }
        }

        // Tampilkan konten target yang sesuai
        const target = document.querySelector(rewardInput.getAttribute("data-target"));
        if (target) {
          target.classList.remove("hidden");
          setTimeout(() => {
            target.classList.add("active"); // Menambahkan kelas active untuk animasi muncul
          }, 10); // Delay sedikit agar animasi dimulai
        }

        // Scroll otomatis ke target reward
        target.scrollIntoView({
          behavior: "smooth", // Smooth scroll
          block: "center", // Pastikan target di posisi tengah
        });
      }, 300); // Memberikan waktu setelah modal terbuka sebelum memilih reward dan menampilkan target content
    });
  });

  const continueButtons = document.querySelectorAll("#continue-button");
  const successPopup = document.getElementById("success-popup");
  const closeSuccessPopup = document.getElementById("close-success");
  const totalBacked = document.querySelector('[data-target="89914"]'); // Total backers ($89914)
  const totalBackers = document.querySelector('[data-target="5007"]'); // Total number of backers (5007)
  const bambooStandHome = document.getElementById("bamboo-stand-home"); // Stok Bamboo Stand di beranda
  const bambooStandLeft = document.getElementById("bamboo-stand-left"); // Stok Bamboo Stand di modal
  const bambooStandLeftSm = document.getElementById("bamboo-stand-left-sm"); // Stok Bamboo Stand di modal
  const blackEditionHome = document.getElementById("black-edition-home"); // Stok Black Edition di beranda
  const blackEditionLeft = document.getElementById("black-edition-left"); // Stok Black Edition di modal
  const blackEditionLeftSm = document.getElementById("black-edition-left-sm"); // Stok Black Edition di modal
  
  continueButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const selectedReward = document.querySelector('input[name="pledge"]:checked');
      
      // Reset error messages and input styles
      document.querySelectorAll(".error-message").forEach((msg) => {
        msg.textContent = "";
        msg.classList.add("hidden");
      });
      document.querySelectorAll(".pledge-input").forEach((input) => {
        input.classList.remove("shake", "input-error");
      });
  
      if (!selectedReward) {
        const noRewardError = document.getElementById("no-reward-error");
        noRewardError.textContent = "Please select a reward.";
        noRewardError.classList.remove("hidden");
        return;
      }
  
      const targetContent = document.querySelector(selectedReward.getAttribute("data-target"));
      const pledgeInput = targetContent.querySelector("#pledge-input");
      const pledgeValue = parseFloat(pledgeInput?.value) || 0;
  
      // Validation for specific rewards
      if (selectedReward.id === "reward-bamboo-stand" && pledgeValue < 25) {
        const bambooError = document.getElementById("bamboo-error");
        bambooError.textContent = "Please pledge at least $25 for the Bamboo Stand.";
        bambooError.classList.remove("hidden");
  
        // Shake animation and border styling
        pledgeInput.classList.add("shake", "input-error");
        setTimeout(() => pledgeInput.classList.remove("shake"), 500);
        event.preventDefault();
      } else if (selectedReward.id === "reward-black-edition" && pledgeValue < 75) {
        const blackEditionError = document.getElementById("black-edition-error");
        blackEditionError.textContent = "Please pledge at least $75 for the Black Edition Stand.";
        blackEditionError.classList.remove("hidden");
  
        // Shake animation and border styling
        pledgeInput.classList.add("shake", "input-error");
        setTimeout(() => pledgeInput.classList.remove("shake"), 500);
        event.preventDefault();
      } else if (selectedReward.id === "pledge-no-reward" && pledgeInput?.value.trim() === "") {
        const noRewardError = document.getElementById("no-reward-error");
        noRewardError.textContent = "Please enter an amount if you select 'No Reward'.";
        noRewardError.classList.remove("hidden");
  
        // Shake animation and border styling
        pledgeInput.classList.add("shake", "input-error");
        setTimeout(() => pledgeInput.classList.remove("shake"), 500);
        event.preventDefault();
      } else {
        // If no error, proceed to update stats and show success popup
        pledgeInput.classList.remove("shake", "input-error");
        pledgeInput.value = ""; // Clear the input field
  
        // Update total backers (add 1 to current value)
        let currentBackers = parseInt(totalBackers.innerText.replace(/\D/g, "")); // Remove commas
        totalBackers.innerText = (currentBackers + 1).toLocaleString(); // Format with commas
  
        // Update total backed (add pledge value to current value)
        let currentTotalBacked = parseInt(totalBacked.innerText.replace(/\D/g, ""));
        let newTotalBacked = currentTotalBacked + pledgeValue;
        totalBacked.innerText = `$${newTotalBacked.toLocaleString()}`;

        // Perbarui lebar progress bar
        animateProgressBar(newTotalBacked);
  
        // Update remaining stock based on reward selected
        if (selectedReward.id === "reward-bamboo-stand") {
          let bambooStockHome = parseInt(bambooStandHome.innerText); // Stok di home
          let bambooStockModal = parseInt(bambooStandLeft.innerText); // Stok di modal
          let bambooStockModalSm = parseInt(bambooStandLeftSm.innerText); // Stok di modal

          if (bambooStockHome > 0 && bambooStockModal > 0 && bambooStandLeftSm) {
            // Kurangi stok di home dan modal
            bambooStandHome.innerText = bambooStockHome - 1;
            bambooStandLeft.innerText = bambooStockModal - 1;
            bambooStandLeftSm.innerText = bambooStockModalSm - 1;
          }
        } else if (selectedReward.id === "reward-black-edition") {
          let blackEditionStockHome = parseInt(blackEditionHome.innerText); // Stok di home
          let blackEditionStockModal = parseInt(blackEditionLeft.innerText); // Stok di modal
          let blackEditionStockModalSm = parseInt(blackEditionLeftSm.innerText); // Stok di modal

          if (blackEditionStockHome > 0 && blackEditionStockModal > 0) {
            // Kurangi stok di home dan modal
            blackEditionHome.innerText = blackEditionStockHome - 1;
            blackEditionLeft.innerText = blackEditionStockModal - 1;
            blackEditionLeftSm.innerText = blackEditionStockModalSm - 1;
          }
        }
  
        // Close modal and show success popup
        closeModal();
        setTimeout(() => {
          successPopup.classList.remove("hidden");
          successPopup.classList.add("active");
        }, 300);
      }
    });
  });


  closeSuccessPopup.addEventListener("click", function () {
    // Tambahkan kelas untuk memicu animasi keluar
    // successContent.classList.add("closing");
    successPopup.classList.add("closing");

    // Tunggu hingga animasi selesai sebelum menyembunyikan elemen
    setTimeout(() => {
      successPopup.classList.remove("active", "closing");
      // successContent.classList.remove("active", "closing");
      successPopup.classList.add("hidden"); // Sembunyikan elemen setelah animasi selesai
    }, 300); // Durasi harus sama dengan animasi fadeOut dan scaleOut
  });


  // program untuk animasi seluruh konten
  // Seleksi semua elemen yang ingin dianimasikan
  const slideDownElements = document.querySelectorAll('.slide-down');
  // Buat Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Tambahkan delay dengan interval waktu untuk animasi
          setTimeout(() => {
            entry.target.classList.add('active');
          }, index * 200); // 200ms adalah jeda antara elemen
          observer.unobserve(entry.target); // Hentikan pengamatan elemen setelah animasi
        }
      });
    },
    { threshold: 0.4 }
  );

  // Tambahkan elemen ke observer
  slideDownElements.forEach((el) => observer.observe(el));

  // Seleksi semua elemen dengan angka yang ingin dianimasikan
  const statNumbers = document.querySelectorAll('.stat-number');

  // Buat Intersection Observer untuk angka
  const numberObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Mulai animasi angka
          const stat = entry.target;
          const target = +stat.getAttribute('data-target'); // Angka tujuan
          const increment = target / 100; // Kecepatan animasi (200 frame)

          let current = 0;

          function updateNumber() {
            current += increment;
            if (current < target) {
              stat.textContent = Math.floor(current).toLocaleString(); // Format angka
              requestAnimationFrame(updateNumber);
            } else {
              stat.textContent = target.toLocaleString(); // Pastikan angka akhir benar
            }
          }

          updateNumber();

          // Hentikan pengamatan untuk elemen ini
          numberObserver.unobserve(stat);
        }
      });
    },
    { threshold: 0.4 } // Adjust threshold sesuai kebutuhan
  );

  // Tambahkan elemen ke observer
  statNumbers.forEach((stat) => numberObserver.observe(stat));

  function animateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const statElement = document.querySelector(".stat-number[data-target='89914']");
    const currentValue = parseInt(statElement.innerText.replace(/\D/g, "")); // Ambil angka dari teks DOM
    const maxValue = 100000; // Nilai maksimal (100,000)

    const targetPercentage = (currentValue / maxValue) * 100; // Hitung persentase target
    let currentWidth = 0;

    // Animasi bar dari 0 ke targetPercentage
    const interval = setInterval(() => {
      if (currentWidth >= targetPercentage) {
          clearInterval(interval); // Hentikan animasi saat target tercapai
      } else {
          currentWidth++;
          progressBar.style.width = `${currentWidth}%`; // Perbarui lebar bar
      }
    }, 10); // Kecepatan animasi
  }

    // Jalankan animasi setelah halaman dimuat
  window.onload = function () {
    animateProgressBar();
  };
});


